const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/api',
  timeout: 60 * 1000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    actionTimeout: 15000,
    navigationTimeout: 15000,
  }
});
