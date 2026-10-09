class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async getProductNames() {
    return this.items.locator('.inventory_item_name').allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
