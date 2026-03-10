import { Page } from '@playwright/test';

export class MatchStudentPopup {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPopup() {
    await this.page.locator('text=Find Better Match').waitFor();
  }

  async searchStudent(studentName: string) {
    await this.page.locator('#studentSearchInput').fill(studentName);
  }

  async selectStudent(studentName: string) {
    await this.page.locator(`text=${studentName}`).first().click();
  }

  async confirmMatch() {
    await this.page.locator('button:has-text("Match")').click();
  }

  async closePopup() {
    await this.page.locator('button:has-text("Close")').click();
  }

}