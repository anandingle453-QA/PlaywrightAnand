class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  productCard(productName) {
    return this.productCards.filter({ hasText: productName });
  }

  async getProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async openProduct(productName) {
    await this.productCard(productName)
      .locator('.inventory_item_name')
      .click();
  }

  async getSelectedProductName() {
    return (await this.page.locator('.inventory_details_name').textContent()).trim();
  }

  async addProduct(productName) {
    await this.productCard(productName)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) {
      return 0;
    }
    return Number(await this.cartBadge.textContent());
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { ProductsPage };
