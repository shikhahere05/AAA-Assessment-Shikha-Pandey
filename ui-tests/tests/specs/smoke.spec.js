const { test, expect } = require('@playwright/test');
const LoginPage = require('../page-objects/login-page');
const InventoryPage = require('../page-objects/inventory-page');

test.describe('SauceDemo UI smoke tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('Test 1: standard user can login, add a product, and complete checkout', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

    const itemName = await inventoryPage.firstItemName();
    expect(itemName.length).toBeGreaterThan(0);
    
    await inventoryPage.addFirstItemToCart();
    await expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    await inventoryPage.checkout();

    await inventoryPage.userInfo('shikha', 'pandey', '12345');

    await inventoryPage.finish();
    await expect(inventoryPage.isComplete()).resolves.toBe(true);
  });

  test('Test 2: invalid login shows error', async ({ page }) => {
    await loginPage.login('locked_out_user', 'wrong_password');

    await expect(await loginPage.hasError()).toBe(true);
    await expect(page.locator(loginPage.selectors.error)).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});
