const { test, expect } = require('@playwright/test');
const BookingAPIClient = require('./booking-api-client');
const { getTestData, createValidBookingPayload } = require('./test-helpers');

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API Tests', () => {
  let apiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new BookingAPIClient(request);
  });

  // =====================================================
  // HAPPY PATH - Core functionality
  // =====================================================

  test('should create and retrieve a booking', async () => {
    const payload = createValidBookingPayload();
    const created = await apiClient.createBooking(payload);

    expect(created.bookingid).toBeGreaterThan(0);
    expect(created.booking.firstname).toBe(payload.firstname);

    const retrieved = await apiClient.getBooking(created.bookingid);
    expect(retrieved.firstname).toBe(payload.firstname);
  });

  test('should update a booking', async () => {
    const created = await apiClient.createBooking(createValidBookingPayload());
    const updated = await apiClient.updateBooking(created.bookingid, {
      ...createValidBookingPayload(),
      firstname: 'Updated'
    });

    expect(updated.firstname).toBe('Updated');
  });

  test('should work with parameterized test data', async () => {
    const testDataList = getTestData();
    for (const testData of testDataList) {
      const response = await apiClient.createBooking({
        firstname: testData.firstname,
        lastname: testData.lastname,
        totalprice: testData.totalprice,
        depositpaid: testData.depositpaid,
        bookingdates: {
          checkin: testData.checkin,
          checkout: testData.checkout
        },
        additionalneeds: testData.additionalneeds
      });

      expect(response.bookingid).toBeGreaterThan(0);
      expect(response.booking.firstname).toBe(testData.firstname);
    }
  });

  // =====================================================
  // UNHAPPY PATH - Error handling
  // =====================================================

  test('should return 404 for non-existent booking', async () => {
    const response = await apiClient.request.get(`${BASE_URL}/booking/999999999`);
    expect(response.status()).toBe(404);
  });

  test('should reject missing required fields', async () => {
    const response = await apiClient.request.post(`${BASE_URL}/booking`, {
      data: { firstname: 'Test' },
      headers: { 'Content-Type': 'application/json' }
    });
    expect([400, 500]).toContain(response.status());
  });

  test('should require authentication for updates', async ({ request }) => {
    const created = await apiClient.createBooking(createValidBookingPayload());
    const noAuth = await request.put(`${BASE_URL}/booking/${created.bookingid}`, {
      data: createValidBookingPayload(),
      headers: { 'Content-Type': 'application/json' }
    });
    expect([401, 403]).toContain(noAuth.status());
  });

  // =====================================================
  // BOUNDARY CONDITIONS - Edge cases
  // =====================================================

  test('should handle zero and max prices', async () => {
    const zero = await apiClient.createBooking(
      createValidBookingPayload({ totalprice: 0 })
    );
    expect(zero.booking.totalprice).toBe(0);

    const max = await apiClient.createBooking(
      createValidBookingPayload({ totalprice: 999999 })
    );
    expect(max.booking.totalprice).toBe(999999);
  });

  test('should handle edge case dates', async () => {
    const sameDay = await apiClient.createBooking(
      createValidBookingPayload({
        bookingdates: { checkin: '2026-04-15', checkout: '2026-04-15' }
      })
    );
    expect(sameDay.booking.bookingdates.checkin).toBe('2026-04-15');
  });

  test('should handle long string inputs', async () => {
    const response = await apiClient.createBooking(
      createValidBookingPayload({ firstname: 'A'.repeat(100) })
    );
    expect(response.bookingid).toBeGreaterThan(0);
  });
});
