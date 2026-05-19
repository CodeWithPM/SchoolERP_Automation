# School ERP – Aadhaar Card Details Automation Framework

Enterprise Playwright + TypeScript framework with Page Object Model for the **Aadhaar Card Details** module.

## Structure

```
├── tests/smoke/          # Smoke tests (SMK-01 to SMK-08)
├── tests/system/         # System / functional tests (SYS-01 to SYS-11)
├── tests/ui/             # UI validation (UI-01 to UI-07)
├── tests/responsive/     # Responsive tests (RESP-01 to RESP-05)
├── pages/                # Page Objects
├── utils/                # Helpers (wait, screenshot, responsive, dialog, logger)
├── test-data/            # Credentials & test data
├── fixtures/             # Playwright fixtures
├── reporters/            # Custom QA summary reporter
├── screenshots/          # Manual screenshots
└── reports/              # HTML + QA reports
```

## Setup

```bash
npm install
npx playwright install
copy .env.example .env   # optional – override credentials
```

## Run Commands

```bash
npm test                  # Full suite (Chromium + Firefox + WebKit)
npm run test:smoke        # Smoke only
npm run test:system       # System tests
npm run test:ui           # UI tests
npm run test:responsive   # Responsive tests
npm run test:chromium     # Chromium desktop only
npm run report            # Open HTML report
```

## Reports

| Report | Location |
|--------|----------|
| HTML Report | `reports/html-report/index.html` |
| QA Summary | `reports/QA-SUMMARY-REPORT.md` |
| Defect Report | `reports/DEFECT-REPORT.md` |
| JSON Results | `reports/test-results.json` |

## Application

- **URL:** https://schoolwebsiteui.aaditechnology.com/schoolList
- **School:** Pawar Public School, hadapsar
- **Navigation:** Sidebar → Extra Screens → Quick Find → **Add Aadhar Card Details**

## Features

- Page Object Model
- Step logging on every action
- Screenshot & video on failure
- Post-login dialog handling
- Multi-viewport responsive testing
- Custom QA & defect reports
