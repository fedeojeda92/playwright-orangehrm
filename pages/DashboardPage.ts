import { type Page, type Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.heading).toBeVisible();
  }
}
