import { Page } from '@playwright/test';

export class ConsentPage {

  constructor(private page: Page) {}

  async acceptPermission() {
    await this.page.locator('button:has-text("Accept")').click();
  }
}