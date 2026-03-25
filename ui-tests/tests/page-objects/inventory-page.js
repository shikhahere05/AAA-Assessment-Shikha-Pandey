const BasePage = require('./base-page');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      inventoryId: '[data-test="inventory-container"]',
      inventoryList: '.inventory_item_name',
      addToCartButtons: '#add-to-cart-sauce-labs-backpack',
      cartLink: '.shopping_cart_link',
      checkoutButton: '#checkout',
      firstName: '#first-name',
      lastName: '#last-name',
      postalCode: '#postal-code',
      continue: '#continue',
      finish: '#finish',
      completeHeader: '.complete-header'
    };
  }
  async isLoaded() {
    return this.isVisible(this.selectors.inventoryId);
  }

  async firstItemName() {
    const firstItem = this.page.locator(this.selectors.inventoryList).first();
    await firstItem.waitFor({ state: 'visible', timeout: 15000 });
    return firstItem.innerText();
  }

  async addFirstItemToCart() {
    await this.page.locator(this.selectors.addToCartButtons).first().click();
  }

  async getCartCount() {
    const badge = this.page.locator(this.selectors.cartLink);
    const visible = await badge.isVisible().catch(() => false);
    if (!visible) return 0;
    return Number(await badge.innerText());
  }

  async goToCart() {
    await this.click(this.selectors.cartLink);
  }

  async checkout() {
    await this.click(this.selectors.checkoutButton);
  }

  async userInfo(firstName, lastName, postalCode) {
    await this.fill(this.selectors.firstName, firstName);
    await this.fill(this.selectors.lastName, lastName);
    await this.fill(this.selectors.postalCode, postalCode);
    await this.click(this.selectors.continue);
  }

  async finish() {
    await this.click(this.selectors.finish);
  }

  async isComplete() {
    return this.isVisible(this.selectors.completeHeader);
  }
}

module.exports = InventoryPage;
