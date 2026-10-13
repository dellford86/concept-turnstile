const { chromium } = require('playwright');

const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6008';
const SNAPSHOTS_DIR = `${process.cwd()}/__snapshots__`;

let browser;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

test('all token stories match their visual baseline', async () => {
  const res = await fetch(`${STORYBOOK_URL}/index.json`);
  if (!res.ok) {
    throw new Error(
      `Could not reach Storybook at ${STORYBOOK_URL} (${res.status}). Is \`npm run storybook\` running?`,
    );
  }
  const { entries } = await res.json();
  const storyIds = Object.values(entries)
    .filter((entry) => entry.type === 'story')
    .map((entry) => entry.id);

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const failures = [];

  for (const id of storyIds) {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
    const image = await page.screenshot({ fullPage: true });
    try {
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir: SNAPSHOTS_DIR,
        customSnapshotIdentifier: id,
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
      });
    } catch (err) {
      failures.push(`${id}: ${String(err.message).split('\n')[0]}`);
    }
  }

  await page.close();

  if (failures.length > 0) {
    throw new Error(`Visual regression in ${failures.length} stor${failures.length === 1 ? 'y' : 'ies'}:\n${failures.join('\n')}`);
  }
});
