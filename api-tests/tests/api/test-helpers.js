const fs = require('fs');
const path = require('path');

/**
 * Test Data and Helpers
 * Provides utilities for test data management and creation
 */

/**
 * Load parameterized test data from external JSON file
 * @returns {Array} Array of test data objects
 */
function getTestData() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, 'booking-data.json'), 'utf-8')
  );
}

/**
 * Test data builder - helps create realistic test data and variations
 * @param {Object} overrides - Object with properties to override defaults
 * @returns {Object} Complete booking payload with defaults merged with overrides
 */
function createValidBookingPayload(overrides = {}) {
  return {
    firstname: 'John',
    lastname: 'Smith',
    totalprice: 500,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-03-01',
      checkout: '2026-03-05'
    },
    additionalneeds: 'Breakfast',
    ...overrides
  };
}

module.exports = {
  getTestData,
  createValidBookingPayload
};
