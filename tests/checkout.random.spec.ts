import { test, expect, Page } from '@playwright/test';

// Helper: pick n unique random integers in [0, max)
function pickUnique(count: number, max: number): number[] {
    const set = new Set<number>();
    while (set.size < count) set.add(Math.floor(Math.random() * max));
    return [...set];
}

// Helper: on the inventory page, add N random items and return their names
async function addRandomItemsAndGetNames(page: Page, howMany: number): Promise<string[]> {
    const items = page.locator('.inventory_item');
    const total = await items.count();
    expect(total, 'Need at least 3 products on the page').toBeGreaterThanOrEqual(howMany);

    const chosenIdx = pickUnique(howMany, total);
    const chosenNames: string[] = [];

    for (const i of chosenIdx) {
        const card = items.nth(i);
        const name = (await card.locator('.inventory_item_name').textContent())?.trim() || '';
        chosenNames.push(name);

        // Add button inside this card
        await card.getByRole('button', { name: /Add to cart/i }).click();
    }

    // Badge should reflect the number added
    await expect(page.locator('.shopping_cart_badge')).toHaveText(String(howMany));
    return chosenNames;
}

test('SauceDemo • checkout with 3 RANDOM items', async ({ page }) => {
    // 1) Login
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);

    // 2) Randomly add 3 items
    const pickedNames = await addRandomItemsAndGetNames(page, 3);

    // 3) Cart: verify the same 3 items are present
    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(3);

    for (const name of pickedNames) {
        await expect(page.getByText(name, { exact: true })).toBeVisible();
    }

    // 4) Checkout info
    await page.getByTestId('checkout').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await page.getByTestId('firstName').fill('Abdulaziz');
    await page.getByTestId('lastName').fill('Alali');
    await page.getByTestId('postalCode').fill('13321');
    await page.getByTestId('continue').click();

    // 5) Overview: same items should appear
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(3);
    for (const name of pickedNames) {
        await expect(page.getByText(name, { exact: true })).toBeVisible();
    }

    // 6) Finish & thank-you page
    await page.getByTestId('finish').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

    // 7) Back home
    await page.getByTestId('back-to-products').click();
    await expect(page).toHaveURL(/inventory\.html/);
});
