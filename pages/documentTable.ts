import { Page, expect } from "@playwright/test";

export class DocumentTablePage {

  constructor(private page: Page) {}

  async waitForDocument(fileName: string) {

    await expect.poll(async () => {

      await this.page.reload();
      return await this.page.locator(`text=${fileName}`).count();

    }, { timeout: 120000 }).toBeGreaterThan(0);
  }

  async openDocument(fileName: string) {
    await this.page.locator(`text=${fileName}`).click();
  }

  async clickReclassify() {
    await this.page.locator('button:has-text("Reclassify")').click();
  }

  async clickFindBetterMatch() {
    await this.page.locator('//button[text()="Find Better Match"]').click();
    await this.page.locator('//input[@placeholder="Search for a better student match..."]').click();
    await this.page.locator('//input[@placeholder="Search for a better student match..."]').fill('Naresh');
    await this.page.locator('//input[@name="student-selection"]').click();
    await this.page.locator('//button[text()="Save Match"]').click();


  }

  async syncDocument() {
    await this.page.locator('//input[@title="Select/deselect this document"][1]').click();
    await this.page.locator('//button[text()="Sync"]').click();
  }

}