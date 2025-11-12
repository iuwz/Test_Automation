import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { }

    async expectLoadedAndCount(n: number) {
        await expect(this.page).toHaveURL(/cart\.html/);
        await expect(this.page.locator('.cart_item')).toHaveCount(n);
    }

    async expectContains(names: string[]) {
        for (const name of names) {
            await expect(this.page.getByText(name, { exact: true })).toBeVisible();
        }
    }

    async checkout() {
        await this.page.getByTestId('checkout').click();
    }
}
