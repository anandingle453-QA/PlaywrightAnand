import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import assert from 'assert';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
});

Given('user is on login page', async () => {
  await loginPage.goto();
});

When('user enters username {string}', async (username: string) => {
  await loginPage.enterUsername(username);
});

When('user enters password {string}', async (password: string) => {
  await loginPage.enterPassword(password);
});

When('user clicks login button', async () => {
  await loginPage.clickLogin();
});

Then('user should be navigated to inventory page', async () => {
  const url = page.url();
  assert.ok(url.includes('inventory'));
});

When('user adds product {string} to the cart', async (product: string) => {
  await inventoryPage.addProduct(product);
});

When('user opens the cart', async () => {
  await inventoryPage.openCart();
});

Then('the cart should contain products {string} and {string}', async (firstProduct: string, secondProduct: string) => {
  const productNames = await inventoryPage.getCartProductNames();

  assert.strictEqual(productNames.length, 2);
  assert.deepStrictEqual(productNames.sort(), [firstProduct, secondProduct].sort());
});

After(async () => {
  await browser.close();
});