import { Page } from '@playwright/test';

export class ReclassifyPopup {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPopup() {
    await this.page.locator('text=Reclassify Document').waitFor();
  }

  async selectDocumentType(type: string) {
    await this.page.locator('#documentTypeDropdown').click();
    await this.page.locator(`text=${type}`).click();
  }

  async confirmReclassify() {
    await this.page.locator('button:has-text("Confirm")').click();
  }

  async cancel() {
    await this.page.locator('button:has-text("Cancel")').click();
  }

}