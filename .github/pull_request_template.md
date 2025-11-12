## What’s in this PR?
- E2E checkout flow (random 3 items) with POM + fixtures
- Reporting (HTML + JUnit), traces on retry
- GitHub Actions CI with report artifacts

## How to run locally
```bash
npm ci
npx playwright install --with-deps
npm test