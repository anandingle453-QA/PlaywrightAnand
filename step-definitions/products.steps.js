const assert = require('node:assert/strict');
const { When, Then } = require('@cucumber/cucumber');
const testData = require('../test-data/testData');

When('the user adds the backpack to the cart', async function () {
  await this.productsPage.addProduct(testData.products.backpack);
});

When('the user opens the backpack details', async function () {
  await this.productsPage.openProduct(testData.products.backpack);
});

When('the user adds the backpack and bike light to the cart', async function () {
  await this.productsPage.addProduct(testData.products.backpack);
  await this.productsPage.addProduct(testData.products.bikeLight);
});

When('the user opens the cart', async function () {
  await this.productsPage.openCart();
});

Then('the products list should include the backpack and bike light', async function () {
  const productNames = await this.productsPage.getProductNames();
  assert.ok(productNames.includes(testData.products.backpack));
  assert.ok(productNames.includes(testData.products.bikeLight));
});

Then('the selected product should be the backpack', async function () {
  assert.equal(
    await this.productsPage.getSelectedProductName(),
    testData.products.backpack
  );
});

Then('the cart badge should show {int} item', async function (count) {
  assert.equal(await this.productsPage.getCartCount(), count);
});

Then('the cart should contain the backpack and bike light', async function () {
  const productNames = (await this.cartPage.getProductNames()).sort();
  assert.deepEqual(productNames, [
    testData.products.backpack,
    testData.products.bikeLight
  ].sort());
});
