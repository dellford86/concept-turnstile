module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/visual-tests/**/*.test.cjs'],
  setupFilesAfterEnv: ['<rootDir>/visual-tests/jest.setup.cjs'],
  // One test iterates every Storybook story serially (navigate + screenshot + compare
  // each); 30s stopped being enough once the component library grew past ~15 stories.
  testTimeout: 120000,
};
