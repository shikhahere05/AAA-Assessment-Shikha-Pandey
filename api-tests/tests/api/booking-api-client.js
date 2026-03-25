const { expect } = require('@playwright/test');

const BASE_URL = 'https://restful-booker.herokuapp.com';

/**
 * BookingAPIClient
 * Encapsulates all API operations for the Restful Booker service.
 * Provides a clean interface for test code to interact with the API.
 */
class BookingAPIClient {
  constructor(request) {
    this.request = request;
    this.authToken = null;
  }

  /**
   * Authenticate with the API and cache the token
   * @returns {Promise<string>} Auth token
   */
  async authenticate() {
    try {
      const response = await this.request.post(`${BASE_URL}/auth`, {
        data: { username: 'admin', password: 'password123' },
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status() !== 200) {
        throw new Error(
          `Authentication failed with status ${response.status()}: ${await response.text()}`
        );
      }
      const { token } = await response.json();
      this.authToken = token;
      return token;
    } catch (error) {
      throw new Error(`Failed to authenticate: ${error.message}`);
    }
  }

  /**
   * Create a new booking
   * @param {Object} bookingPayload - Booking data
   * @returns {Promise<Object>} Response with bookingid and booking data
   */
  async createBooking(bookingPayload) {
    try {
      const response = await this.request.post(`${BASE_URL}/booking`, {
        data: bookingPayload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      
      // Validate response structure
      expect(body.bookingid).toBeTruthy();
      expect(body.booking).toBeTruthy();

      return body;
    } catch (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  /**
   * Get a booking by ID
   * @param {number} bookingId - Booking ID
   * @returns {Promise<Object>} Booking data
   */
  async getBooking(bookingId) {
    try {
      const response = await this.request.get(`${BASE_URL}/booking/${bookingId}`);
      
      if (response.status() === 404) {
        return null;
      }

      expect(response.status()).toBe(200);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to get booking ${bookingId}: ${error.message}`);
    }
  }

  /**
   * Update an existing booking (requires authentication)
   * @param {number} bookingId - Booking ID
   * @param {Object} updatePayload - Updated booking data
   * @returns {Promise<Object>} Updated booking data
   */
  async updateBooking(bookingId, updatePayload) {
    if (!this.authToken) {
      await this.authenticate();
    }

    try {
      const response = await this.request.put(`${BASE_URL}/booking/${bookingId}`, {
        data: updatePayload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie: `token=${this.authToken}`
        }
      });

      expect(response.status()).toBe(200);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to update booking ${bookingId}: ${error.message}`);
    }
  }

  /**
   * Delete a booking (requires authentication)
   * @param {number} bookingId - Booking ID
   */
  async deleteBooking(bookingId) {
    if (!this.authToken) {
      await this.authenticate();
    }

    try {
      const response = await this.request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
          Cookie: `token=${this.authToken}`
        }
      });

      expect(response.status()).toBe(201);
    } catch (error) {
      throw new Error(`Failed to delete booking ${bookingId}: ${error.message}`);
    }
  }
}

module.exports = BookingAPIClient;
