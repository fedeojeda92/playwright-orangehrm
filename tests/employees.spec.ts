import { test, expect } from '../fixtures/test';

// Unique data so runs never collide with other users of the shared demo.
const suffix = Date.now();
const firstName = `Fede${suffix}`;
const lastName = 'Playwright';

test.describe.serial('PIM - Employees', () => {
  test('T3 - searching a non-existent employee shows "No Records Found"', async ({ loggedIn, employeeListPage }) => {
    await employeeListPage.goto();
    await employeeListPage.searchByName(`NoExiste${suffix}`);
    await expect(employeeListPage.noRecords).toBeVisible();
    await expect(employeeListPage.rows).toHaveCount(0);
  });

  test('T4 - adding an employee saves it and opens Personal Details', async ({ loggedIn, addEmployeePage, personalDetailsPage }) => {
    await addEmployeePage.goto();
    await addEmployeePage.create(firstName, lastName);
    await personalDetailsPage.expectLoadedWith(firstName, lastName);
  });

  test('T5 - the created employee appears in the search', async ({ loggedIn, employeeListPage }) => {
    await employeeListPage.goto();
    await employeeListPage.searchByName(firstName);
    const row = employeeListPage.rowWith(firstName).first();
    await expect(row).toBeVisible();
    await expect(row).toContainText(lastName);
  });
});
