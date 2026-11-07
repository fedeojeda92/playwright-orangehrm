import { test, expect, ADMIN } from '../fixtures/test';

test.describe('Login', () => {
  test('T1 - valid credentials open the Dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.login(ADMIN.user, ADMIN.pass);
    await dashboardPage.expectLoaded();
  });

  test('T2 - invalid credentials show an error and stay on login', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(ADMIN.user, 'wrong-password');
    await expect(loginPage.errorAlert).toHaveText('Invalid credentials');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
