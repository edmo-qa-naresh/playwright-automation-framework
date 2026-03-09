import { Page, expect } from '@playwright/test';

export class LoginPage {

  readonly page: Page;

  constructor(page: Page){
    this.page = page;
  }

  async navigate(){
    await this.page.goto('https://edm.test.technolutions.net/manage/login');
  }

  async enterUsername(username: string){
    await this.page.locator("//input[@id='user']").fill(username);
  }

  async enterPassword(password: string){
    await this.page.locator("//input[@id='password']").fill(password);
  }

  async clickLogin(){
    await this.page.locator('//button[text()="Login"]').click();
  }

  async login(username: string, password: string){
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

}