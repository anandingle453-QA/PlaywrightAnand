const assert = require('node:assert/strict');
const { When, Then } = require('@cucumber/cucumber');
const testData = require('../test-data/testData');

When('the user starts checkout', async function () {
  await this.cartPage.checkout();
});

When('the user enters the checkout details', async function () {
  await this.checkoutPage.enterCustomerDetails(testData.checkout);
});

Then('the order overview should include the backpack and bike light', async function () {
  const productNames = (await this.checkoutPage.getOverviewProductNames()).sort();
  assert.deepEqual(productNames, [
    testData.products.backpack,
    testData.products.bikeLight
  ].sort());
});

When('the user finishes the order', async function () {
  await this.checkoutPage.finishOrder();
});

Then('the order completion message should be displayed', async function () {
  assert.equal(
    await this.checkoutPage.getConfirmationMessage(),
    testData.messages.orderComplete
  );
  assert.match(this.page.url(), /checkout-complete\.html$/);
});
