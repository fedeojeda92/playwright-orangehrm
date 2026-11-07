import { type Page, type Locator, expect } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await this.page.goto('/web/index.php/pim/addEmployee');
    await expect(this.firstName).toBeVisible();
  }

  async create(first: string, last: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.saveButton.click();
  }
}
