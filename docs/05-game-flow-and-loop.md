# 05 — Game Flow & Loop

Step-by-step fan interaction cycle from entry to live reward.

| # | Step | Context |
|---|------|---------|
| 1 | User enters stadium | OFF-APP • Geofence tracking |
| 2 | User gets a push notification | OFF-APP • Geofence tracking |
| 3 | User enters app | IN-APP • User interaction |
| 4 | User predicts fan attendance | IN-APP • User interaction |
| 5 | User lands on game view | IN-APP • User interaction |
| 6 | (Optional) User achieves milestone | IN-APP • User interaction |
| 7 | Official Count Ingestion | Stadium Ops • Direct API |
| 8 | Scoreboard Live Reveal | Stadium Ops • Jumbotron |
| 9 | Percentile & Near-Miss Reward | IN-APP • User interaction |

---

## Design checklist for new components/features/pages

- [ ] Which step(s) of the loop does this belong to? Name the step number(s) explicitly.
- [ ] Does it preserve the sequence (geofence → notification → app entry → prediction → game view → [milestone] → official ingestion → scoreboard reveal → reward)?
- [ ] If it's off-app (steps 1–2, 7–8), does it correctly rely on geofence/stadium-ops/Jumbotron infra rather than assuming in-app context?
- [ ] If it's in-app (steps 3–6, 9), does it fit within the existing screens rather than forking a parallel flow?
- [ ] Does it avoid adding friction before step 4 (prediction), where fan attention is most fragile?
