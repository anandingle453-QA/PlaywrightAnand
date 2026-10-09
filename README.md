# SauceDemo Automation

End-to-end UI automation for [SauceDemo](https://www.saucedemo.com/) using
Playwright, Cucumber/Gherkin BDD, JavaScript, and Page Object Model (POM).
GitHub Actions runs the full suite for pushes and pull requests to `main` and
`master`.

## Prerequisites

- Node.js 22 LTS (Node.js 20 or newer is supported)
- npm
- Java 8 or newer to generate or open the Allure report

## Setup

```powershell
git clone https://github.com/anandingle453-QA/PlaywrightAnand.git saucedemo-automation
cd saucedemo-automation
npm ci
npx playwright install chromium
$env:SAUCEDEMO_USERNAME = "<your SauceDemo username>"
$env:SAUCEDEMO_PASSWORD = "<your SauceDemo password>"
```

Set `SAUCEDEMO_USERNAME` and `SAUCEDEMO_PASSWORD` in the environment before
running authenticated scenarios; the framework does not store or default
credentials. `BASE_URL` is optional. Copy `.env.example` as a reference;
environment files are ignored by Git and are not loaded automatically.

For PowerShell, configure these variables in the current terminal session
before running the commands below. For CI, add repository Actions secrets named
`SAUCEDEMO_USERNAME` and `SAUCEDEMO_PASSWORD` under **Settings → Secrets and
variables → Actions**.

## Run tests

```powershell
npm test
npm run test:bdd
npm run test:smoke
npm run test:regression
```

`npm test` and `npm run test:bdd` run all eight independent Gherkin scenarios.
The smoke tag selects the core login, cart, and successful-order journeys;
regression selects the complete scenario set. Test execution is headless by
default. Set `HEADLESS=false` to show Chromium, or `RECORD_VIDEO=true` to save
Playwright videos under `videos/`.

## Reports and failure artifacts

Cucumber writes `reports/cucumber-report.html`; Allure writes raw results to
`allure-results/`. Generate and view the Allure site with:

```powershell
npm run allure:generate
npm run allure:open
```

Allure generation requires Java on `PATH`. `npm run test:report` runs the
complete suite and generates the Allure site when the tests pass. On a failed
scenario, the Cucumber report includes an attached screenshot; the project
also saves screenshots and Playwright traces under `screenshots/` and `traces/`.
Generated reports, test artifacts, dependencies, and environment files are
excluded from Git.

## Project structure

```text
config/             Runtime configuration and environment-variable defaults
features/           Gherkin login, products, cart, and checkout scenarios
pages/              LoginPage, ProductsPage, CartPage, and CheckoutPage
step-definitions/   Cucumber steps
support/            Browser lifecycle hooks and failure artifacts
test-data/          Reusable demo credentials, product names, and checkout data
reports/            Generated Cucumber HTML report
screenshots/        Screenshots captured for failed scenarios
traces/             Playwright traces captured for failed scenarios
videos/             Optional Playwright recordings
.github/workflows/  GitHub Actions CI configuration
```

## CI

The `SauceDemo BDD automation` GitHub Actions workflow installs Node.js and
Chromium, runs `npm test`, generates the Allure report, and uploads reports and
failure artifacts for pushes, pull requests, and manual workflow dispatches.
