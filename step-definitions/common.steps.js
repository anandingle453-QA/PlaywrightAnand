const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');
const testData = require('../test-data/testData');

function getStandardCredentials() {
  const { username, password } = testData.users.standard;
  if (!username || !password) {
    throw new Error(
      'Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in the environment before running authenticated scenarios.'
    );
  }
  return { username, password };
}

Given('the user is on the SauceDemo login page', async function () {
  await this.loginPage.open();
});

Given('the user is logged in with valid credentials', async function () {
  const { username, password } = getStandardCredentials();
  await this.loginPage.open();
  await this.loginPage.login(username, password);
  await this.productsPage.title.waitFor();
});

When('the user logs in with valid credentials', async function () {
  const { username, password } = getStandardCredentials();
  await this.loginPage.login(username, password);
});

When('the user logs in with invalid credentials', async function () {
  await this.loginPage.login(
    testData.users.invalid.username,
    testData.users.invalid.password
  );
});

Then('the user should be on the products page', async function () {
  await this.productsPage.title.waitFor();
  assert.match(this.page.url(), /inventory\.html$/);
});

Then('the login error should explain the credentials are invalid', async function () {
  assert.equal(
    await this.loginPage.getErrorMessage(),
    `Epic sadface: ${testData.messages.invalidCredentials}`
  );
  assert.match(this.page.url(), /saucedemo\.com\/?$/);
});
