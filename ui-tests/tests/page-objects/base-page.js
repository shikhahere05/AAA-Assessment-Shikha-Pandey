class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async click(locator) {
    await this.page.locator(locator).waitFor({ state: 'visible' });
    await this.page.locator(locator).click();
  }

  async fill(locator, value) {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    await element.fill(value);
  }

  async text(locator) {
    return this.page.locator(locator).innerText({ timeout: 15000 });
  }

  async isVisible(locator) {
    return this.page.locator(locator).isVisible({ timeout: 15000 });
  }
}

module.exports = BasePage;
