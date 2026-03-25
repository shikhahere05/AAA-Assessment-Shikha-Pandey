const BasePage = require('./base-page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      username: '#user-name',
      password: '#password',
      loginBtn: '#login-button',
      error: '[data-test="error"]',
      errorMessage: ['Epic sadface: Username and password do not match any user in this service']
    };
  }

  async open() {
    await this.goto('/');
  }

  async login(username, password) {
    await this.fill(this.selectors.username, username);
    await this.fill(this.selectors.password, password);
    await this.click(this.selectors.loginBtn);
  }

  async hasError() {
    return this.page.locator(this.selectors.error).isVisible({ timeout: 1000 }).catch(() => false);
  }
}

module.exports = LoginPage;
