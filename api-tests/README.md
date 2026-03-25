# API Tests - Restful Booker

This folder delivers API automation testing using Playwright + JavaScript for https://restful-booker.herokuapp.com.

## Structure

- `package.json` - npm scripts and dependencies.
- `playwright.config.js` - Test config pointing to `tests/api`.
- `tests/api/booking.spec.js` - API test suite covering endpoints:
  - `GET /ping`
  - `GET /booking`
  - `GET /booking/{id}`
  - `POST /booking`
  - `PUT /booking/{id}`
- `tests/api/booking-data.json` - external parameterized test data.
- `tests/api/booking.schema.json` - JSON Schema for response contract validation.

## Requirements covered

1) API Test Suite
   - positive and negative tests for 3+ endpoints.
   - unhappy paths and boundary conditions.
   - response contract validation with field assertions.
   - parameterized tests from `booking-data.json`.

## Setup

```bash
cd api-tests
npm install
npx playwright install
```

## Run tests

```bash
npm test
```

## Reporting

- Default Playwright reports are in `playwright-report/`
- If a test fails, enjoy automatic trace and screenshot on first retry.

## Notes

- Auth token creation uses `/auth` endpoint and admin credentials in payload.
- Unhappy path includes 500/400 responses for invalid booking data.
- No external data injection required for local run.
