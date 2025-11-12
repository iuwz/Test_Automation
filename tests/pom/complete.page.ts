import { Page, expect } from '@playwright/test';

export class CompletePage {
    constructor(private page: Page) { }

    async expectThankYou() {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' }))
            .toBeVisible();
    }

    async backHome() {
        await this.page.getByTestId('back-to-products').click();
        await expect(this.page).toHaveURL(/inventory\.html/);
    }
}
