import { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;

  private cartLink = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  async addProduct(product: string): Promise<void> {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: product });
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.page.locator(this.cartLink).click();
  }

  async getCartProductNames(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }
}