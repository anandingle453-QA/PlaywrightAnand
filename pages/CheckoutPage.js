class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.completeHeader = page.locator('.complete-header');
  }

  async enterCustomerDetails(details) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.postalCodeInput.fill(details.postalCode);
    await this.continueButton.click();
  }

  async getOverviewProductNames() {
    return this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getConfirmationMessage() {
    return (await this.completeHeader.textContent()).trim();
  }
}

module.exports = { CheckoutPage };
