import { Page, Locator } from "@playwright/test";

export class EmailConfigPage {

  readonly page: Page;
  readonly emailConfigLink: Locator;
  readonly addEmailButton: Locator;
  readonly emailInput: Locator;
  readonly saveButton: Locator;
  readonly starbutton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.starbutton = page.locator('//button[@class="dashboard-tab-button selected"]');
    this.emailConfigLink = page.getByRole('button', { name: 'Email Doc Extractor - Configuration' });

    // Target the correct iframe directly
    const configFrame = page.frameLocator('#email-docs-extractor-config-iframe');

    this.addEmailButton = configFrame.locator('//button[text()="Add Email Account"]');
    this.emailInput = configFrame.locator('//input[@type="email"]');
    this.saveButton = configFrame.locator('//button[text()="Save"]');
  }

  async openConfigPage() {
    await this.starbutton.click();
    await this.page.waitForLoadState('networkidle');
    await this.emailConfigLink.click();

    // Ensure iframe is loaded before actions
    await this.page.waitForSelector('#email-docs-extractor-config-iframe');
  }

  async addOutlookEmail(email: string) {
        await this.addEmailButton.waitFor({ state: 'visible' });

    await this.addEmailButton.click();
    await this.emailInput.fill(email);
    await this.saveButton.click();
  }
}