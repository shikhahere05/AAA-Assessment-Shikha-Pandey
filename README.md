
# AAA Assignment - Test Automation Suite

Complete API and UI test automation for **Restful Booker API** and **SauceDemo Web Application** using **Playwright + JavaScript**.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Test Results & Reports](#test-results--reports)
- [Configuration](#configuration)
- [Test Data](#test-data)
- [Authentication](#authentication)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [NPM Scripts Reference](#npm-scripts-reference)
- [Dependencies](#dependencies)
- [Resources](#resources)

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Link |
|------|---------|------|
| **Node.js** | v20 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v8 or higher | Comes with Node.js |

**Verify installations:**
```bash
node --version
npm --version
```

---

## Project Structure

```
AAA-Assessment-Shikha-Pandey/
├── package.json                      # Root monorepo config
├── README.md                         # This file
├── api-tests/                        # API test suite
│   ├── tests/api/
│   │   ├── booking.spec.js          # API test cases
│   │   ├── booking-api-client.js    # API client implementation
│   │   ├── test-helpers.js          # Test data helpers
│   │   ├── booking-data.json        # Parameterized test data
│   │   └── booking.schema.json      # Response validation schema
│   ├── playwright.config.js
│   └── package.json
├── ui-tests/                         # UI test suite
│   ├── tests/
│   │   ├── specs/
│   │   │   └── smoke.spec.js        # UI smoke tests
│   │   └── page-objects/
│   │       ├── login-page.js
│   │       ├── inventory-page.js
│   │       └── base-page.js
│   ├── playwright.config.js
│   └── package.json
├── reports/                          # Test artifacts (screenshots, traces)
└── Execution_Reports/                # Test execution screenshots and reports
```

---

## Quick Start

### 1. Install Dependencies

From the root directory:
```bash
npm install
```

This installs shared dependencies (**Playwright**, **ESLint**, **Prettier**) for both workspaces.

### 2. Install Playwright Browsers

```bash
npx playwright install
```

---

## Running Tests

### Run All Tests
```bash
npm run test:all
```
Runs API tests followed by UI tests sequentially from root.

### Run API Tests
```bash
npm run api-test              # Run API tests
npm run api-test:report       # View API test report
```

**API Test Coverage:**
- 4 endpoints tested (`GET /ping`, `POST /booking`, `GET /booking/{id}`, `PUT /booking/{id}`)
- Positive and negative test cases
- Unhappy path testing (404, missing fields, auth failures)
- Boundary conditions (zero/max prices, date edge cases, long strings)
- Parameterized tests with external JSON data

### Run UI Tests
```bash
npm run ui-test               # Run UI tests (headless mode + headed mode)
npm run ui-test:headless      # Run UI tests (headless only mode)
npm run ui-test:headed        # Run UI tests (visible browser)
npm run ui-test:report        # View UI test report
```

**UI Test Coverage:**
- Login page automation
- Inventory navigation
- Shopping cart functionality
- Checkout flow
- Screenshots on failure
- HTML trace recordings for debugging

---

## Test Results & Reports

After running tests, view detailed reports:
```bash
npx playwright show-report
```

### Test Output Directory Structure

| Location | Description |
|----------|-------------|
| `api-tests/test-results/` | API test artifacts |
| `ui-tests/test-results/` | UI test artifacts |
| `api-tests/playwright-report/` | API HTML report |
| `ui-tests/playwright-report/` | UI HTML report |
| `Execution_Reports/` | Screenshots of test execution and reports |

**Reports include:**
- Test execution timeline
- Screenshots for each step
- Video recordings (if configured)
- Browser trace files for debugging
- Error details and stack traces

---

## Configuration

### Playwright Config Files

#### API Tests (`api-tests/playwright.config.js`)
```
Target:      https://restful-booker.herokuapp.com
Timeout:     60 seconds
Screenshot:  Only on failure
Trace:       On first retry
```

#### UI Tests (`ui-tests/playwright.config.js`)
```
Target:      https://www.saucedemo.com
Projects:    Chromium (headless + headed)
Screenshot:  Only on failure
Trace:       On first retry
```

---

## Test Data

### API Parameterized Data

File: `api-tests/tests/api/booking-data.json`

Contains test data for multiple users:
- **John Doe** (price: 1237)
- **Jane Smith** (price: 501)

Tests iterate through this data for comprehensive coverage.

---

## Authentication

### API Authentication

- **Endpoint:** `POST /auth`
- **Credentials:**
  - Username: `admin`
  - Password: `password123`
- Token is cached in `BookingAPIClient` for update/delete operations

### UI Authentication

- **URL:** https://www.saucedemo.com
- **Test Users:**
  - `standard_user` / `secret_sauce`
  - `locked_out_user` / `secret_sauce`

---

## Architecture

### Monorepo Setup
- **Root package.json:** Shared dependencies
- **Workspaces:** `api-tests` and `ui-tests`
- **Single npm install:** All dependencies managed centrally
- **Independent execution:** Each workspace runs separately or together

### Code Organization
- Implementation code separate from tests
- Reusable API client (`booking-api-client.js`)
- Test helpers and data builders (`test-helpers.js`)
- Clean page objects for UI (`LoginPage`, `InventoryPage`)

---

## Key Features

### Separation of Concerns
- Implementation code separate from tests
- Reusable API client and test helpers
- Clean page objects for UI

### Best Practices
- Explicit waits (no sleeps)
- Resilient locators
- Comprehensive error handling
- Parameterized testing
- Data builders for flexibility

### Test Coverage
- Happy path flows
- Unhappy path scenarios
- Boundary conditions
- Response contract validation
- Authentication/authorization

### Developer Experience
- Clear test names
- Organized structure
- Easy to extend
- Quick feedback loop

---

## NPM Scripts Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run api-test` | Run API tests |
| `npm run api-test:report` | Show API test report |
| `npm run ui-test` | Run UI tests (headless) |
| `npm run ui-test:headed` | Run UI tests (visible) |
| `npm run ui-test:report` | Show UI test report |
| `npm run test:all` | Run API + UI tests |
| `npm run format` | Format code with Prettier |

---

## Dependencies

### Shared Across Projects

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.44.0 | Test framework |
| `eslint` | ^8.0.0 | Code linting |
| `prettier` | ^2.8.0 | Code formatting |

---

## Resources

- **Playwright Documentation:** https://playwright.dev
- **Restful Booker API:** https://restful-booker.herokuapp.com
- **SauceDemo Application:** https://www.saucedemo.com