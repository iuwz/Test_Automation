import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
    readonly items: Locator;
    readonly cartBadge: Locator;
    constructor(private page: Page) {
        this.items = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.page.getByText('Products')).toBeVisible();
    }

    async addRandomItemsGetNames(count: number): Promise<string[]> {
        const total = await this.items.count();
        expect(total).toBeGreaterThanOrEqual(count);
        const chosen = new Set<number>();
        while (chosen.size < count) chosen.add(Math.floor(Math.random() * total));

        const names: string[] = [];
        for (const idx of chosen) {
            const card = this.items.nth(idx);
            const name = (await card.locator('.inventory_item_name').textContent())!.trim();
            names.push(name);
            await card.getByRole('button', { name: /Add to cart/i }).click();
        }
        await expect(this.cartBadge).toHaveText(String(count));
        return names;
    }

    async openCart() {
        await this.page.getByTestId('shopping-cart-link').click();
    }
}
