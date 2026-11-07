import { type Page, type Locator, expect } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  readonly employeeName: Locator;
  readonly searchButton: Locator;
  readonly rows: Locator;
  readonly noRecords: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeName = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Name' })
      .getByPlaceholder('Type for hints...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.rows = page.locator('.oxd-table-body .oxd-table-card');
    this.noRecords = page.locator('.orangehrm-horizontal-padding').getByText('No Records Found');
  }

  async goto() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await expect(this.searchButton).toBeVisible();
  }

  async searchByName(name: string) {
    await this.employeeName.fill(name);
    await this.searchButton.click();
    await this.page.locator('.oxd-table-loader').waitFor({ state: 'hidden' });
  }

  rowWith(text: string) {
    return this.rows.filter({ hasText: text });
  }
}
