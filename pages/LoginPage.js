class LoginPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    await this.page.goto(this.baseUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return (await this.errorMessage.textContent()).trim();
  }
}

module.exports = { LoginPage };
