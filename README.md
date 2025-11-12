![E2E](https://img.shields.io/github/actions/workflow/status/iuwz/Test_Automation/e2e.yml?label=E2E%20tests)
![Playwright](https://img.shields.io/badge/Playwright-TS-blue)


# Sauce Demo E2E (Playwright + TypeScript)

Automated checkout flow for [saucedemo.com]: login → add 3 **random** items → checkout → thank-you.

## Stack
- Playwright Test (TypeScript)
- POM structure + login fixture
- HTML report locally, JUnit on CI
- Traces/screenshots/videos on failure

## Setup
```bash
npm ci
npx playwright install --with-deps
