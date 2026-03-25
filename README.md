
================================================================================
AAA ASSIGNMENT - TEST AUTOMATION SUITE
================================================================================

Complete API and UI test automation for Restful Booker API and SauceDemo Web 
Application using Playwright + JavaScript.

================================================================================
PREREQUISITES
================================================================================

Before you begin, ensure you have the following installed:

- Node.js (v20 or higher) - https://nodejs.org/
- npm (v8 or higher) - Comes with Node.js


Verify installations:
  node --version
  npm --version

================================================================================
PROJECT STRUCTURE
================================================================================

AAA_Assignment/
  package.json                 - Root monorepo config
  api-tests/                   - API test suite
    tests/api/
      booking.spec.js          - API test cases
      booking-api-client.js    - API client implementation
      test-helpers.js          - Test data helpers
      booking-data.json        - Parameterized test data
      booking.schema.json      - Response validation schema
    playwright.config.js
    package.json
  ui-tests/                    - UI test suite
    tests/
      specs/
        smoke.spec.js          - UI smoke tests
      page-objects/
        login-page.js
        inventory-page.js
        base-page.js
    playwright.config.js
    package.json
  reports/                     - Test artifacts (screenshots, traces)

================================================================================
QUICK START
================================================================================

1. Install Dependencies
   From root directory:
   npm install
   
   This installs shared dependencies (Playwright, ESLint, Prettier) for both 
   workspaces.

2. Install Playwright Browsers
   npx playwright install

================================================================================
RUNNING TESTS
================================================================================

Run All Tests
  npm run test:all
  (Runs API then UI tests sequentially from root)

Run API Tests
  npm run api-test              - Run API tests
  npm run api-test:report       - View API test report
  
  API Test Coverage:
  - 4 endpoints tested (GET /ping, POST /booking, GET /booking/{id}, 
    PUT /booking/{id})
  - Positive and negative test cases
  - Unhappy path testing (404, missing fields, auth failures)
  - Boundary conditions (zero/max prices, date edge cases, long strings)
  - Parameterized tests with external JSON data

Run UI Tests
  npm run ui-test               - Run UI tests (headless mode + headed mode)
  npm run ui-test:headless      - Run UI tests (headless only mode)
  npm run ui-test:headed        - Run UI tests (visible browser)
  npm run ui-test:report        - View UI test report
  
  UI Test Coverage:
  - Login page automation
  - Inventory navigation
  - Shopping cart functionality
  - Checkout flow
  - Screenshots on failure
  - HTML trace recordings for debugging

================================================================================
TEST RESULTS & REPORTS
================================================================================

After running tests, view detailed reports:
  npx playwright show-report

Test Output Directory:
  api-tests/test-results/           - API test artifacts
  ui-tests/test-results/            - UI test artifacts
  api-tests/playwright-report/      - API HTML report
  ui-tests/playwright-report/       - UI HTML report
  Execution_Reports                 - Screenshot of all the test execution and reports

Reports include:
  - Test execution timeline
  - Screenshots for each step
  - Video recordings (if configured)
  - Browser trace files for debugging
  - Error details and stack traces

================================================================================
CONFIGURATION
================================================================================

Playwright Config Files:

API Tests (api-tests/playwright.config.js):
  Target: https://restful-booker.herokuapp.com
  Timeout: 60 seconds
  Screenshot: Only on failure
  Trace: On first retry

UI Tests (ui-tests/playwright.config.js):
  Target: https://www.saucedemo.com
  Projects: Chromium (headless + headed)
  Screenshot: Only on failure
  Trace: On first retry

================================================================================
TEST DATA
================================================================================

API Parameterized Data
  File: api-tests/tests/api/booking-data.json
  
  Contains test data for multiple users:
  - John Doe (1237 price)
  - Jane Smith (501 price)
  
  Tests iterate through this data for comprehensive coverage.

================================================================================
AUTHENTICATION
================================================================================

API Authentication
  Endpoint: POST /auth
  Credentials:
    Username: admin
    Password: password123
  Token is cached in BookingAPIClient for update/delete operations

UI Authentication
  URL: https://www.saucedemo.com
  Test Users:
    standard_user / secret_sauce
    locked_out_user / secret_sauce

================================================================================
ARCHITECTURE
================================================================================

Monorepo Setup:
  - Root package.json: Shared dependencies
  - Workspaces: api-tests and ui-tests
  - Single npm install: All dependencies managed centrally
  - Independent execution: Each workspace runs separately or together

Code Organization:
  - Implementation code separate from tests
  - Reusable API client (booking-api-client.js)
  - Test helpers and data builders (test-helpers.js)
  - Clean page objects for UI (LoginPage, InventoryPage)

================================================================================
KEY FEATURES
================================================================================

Separation of Concerns
  - Implementation code separate from tests
  - Reusable API client and test helpers
  - Clean page objects for UI

Best Practices
  - Explicit waits (no sleeps)
  - Resilient locators
  - Comprehensive error handling
  - Parameterized testing
  - Data builders for flexibility

Test Coverage
  - Happy path flows
  - Unhappy path scenarios
  - Boundary conditions
  - Response contract validation
  - Authentication/authorization

Developer Experience
  - Clear test names
  - Organized structure
  - Easy to extend
  - Quick feedback loop

================================================================================
NPM SCRIPTS REFERENCE
================================================================================

npm install                   - Install all dependencies
npm run api-test              - Run API tests
npm run api-test:report       - Show API test report
npm run ui-test               - Run UI tests (headless)
npm run ui-test:headed        - Run UI tests (visible)
npm run ui-test:report        - Show UI test report
npm run test:all              - Run API + UI tests
npm run format                - Format code with Prettier

================================================================================
DEPENDENCIES
================================================================================

Shared Across Projects:
  @playwright/test ^1.44.0     - Test framework
  eslint ^8.0.0                - Code linting
  prettier ^2.8.0              - Code formatting

================================================================================
RESOURCES
================================================================================

Playwright Docs: https://playwright.dev
Restful Booker API: https://restful-booker.herokuapp.com
SauceDemo App: https://www.saucedemo.com

================================================================================
END OF README
================================================================================