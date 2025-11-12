import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) { }

    async fillInfoAndContinue(first: string, last: string, zip: string) {
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await this.page.getByTestId('firstName').fill(first);
        await this.page.getByTestId('lastName').fill(last);
        await this.page.getByTestId('postalCode').fill(zip);
        await this.page.getByTestId('continue').click();
    }

    async expectOverviewContains(names: string[], count: number) {
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
        await expect(this.page.locator('.cart_item')).toHaveCount(count);
        for (const name of names) {
            await expect(this.page.getByText(name, { exact: true })).toBeVisible();
        }
    }

    async finish() {
        await this.page.getByTestId('finish').click();
    }
}
