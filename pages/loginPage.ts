import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  private username = '#user-name';
  private password = '#password';
  private loginBtn = '#login-button';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.username, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.password, password);
  }

  async clickLogin(): Promise<void> {
    await this.page.click(this.loginBtn);
  }
}