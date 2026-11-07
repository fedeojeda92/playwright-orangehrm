import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';

export const ADMIN = { user: 'Admin', pass: 'admin123' };

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeeListPage: EmployeeListPage;
  addEmployeePage: AddEmployeePage;
  personalDetailsPage: PersonalDetailsPage;
  /** Logs in as Admin before the test body runs. */
  loggedIn: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  employeeListPage: async ({ page }, use) => use(new EmployeeListPage(page)),
  addEmployeePage: async ({ page }, use) => use(new AddEmployeePage(page)),
  personalDetailsPage: async ({ page }, use) => use(new PersonalDetailsPage(page)),
  loggedIn: async ({ loginPage, dashboardPage }, use) => {
    await loginPage.goto();
    await loginPage.login(ADMIN.user, ADMIN.pass);
    await dashboardPage.expectLoaded();
    await use();
  },
});

export { expect };
