import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import users from '../test-data/users.json';

type UserData = {
  validUser: {
    username: string;
    password: string;
  };
};

const userData = users as UserData;

test('Valid user login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    userData.validUser.username,
    userData.validUser.password
  );

  await expect(page).not.toHaveURL(/login/);

});