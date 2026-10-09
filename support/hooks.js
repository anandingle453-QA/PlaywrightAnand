const fs = require('node:fs/promises');
const path = require('node:path');
const { After, Before, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { baseUrl, headless, recordVideo, timeout } = require('../config/config');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

setDefaultTimeout(30000);

Before(async function () {
  this.browser = await chromium.launch({ headless });
  this.context = await this.browser.newContext({
    ...(recordVideo ? { recordVideo: { dir: 'videos' } } : {})
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(timeout);
  this.loginPage = new LoginPage(this.page, baseUrl);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
  await this.context.tracing.start({ screenshots: true, snapshots: true });
});

After(async function ({ pickle, result }) {
  const failed = result?.status === Status.FAILED;
  const artifactName = `${pickle.name}-${Date.now()}`.replace(/[^a-zA-Z0-9_-]/g, '_');

  try {
    if (failed && this.page) {
      const screenshotPath = path.join('screenshots', `${artifactName}.png`);
      const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
      await this.attach(screenshot, 'image/png');
      const tracePath = path.join('traces', `${artifactName}.zip`);
      await this.context.tracing.stop({ path: tracePath });
      await this.attach(await fs.readFile(tracePath), 'application/zip');
    } else if (this.context) {
      await this.context.tracing.stop();
    }
  } finally {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
});
