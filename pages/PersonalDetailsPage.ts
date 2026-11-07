import { type Page, type Locator, expect } from '@playwright/test';

export class PersonalDetailsPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[name="firstName"]');
    this.lastName = page.locator('input[name="lastName"]');
  }

  async expectLoadedWith(first: string, last: string) {
    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    await expect(this.firstName).toHaveValue(first);
    await expect(this.lastName).toHaveValue(last);
  }
}
