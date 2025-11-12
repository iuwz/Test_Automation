import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pom/login.page';
import { InventoryPage } from '../pom/inventory.page';

type AuthFixtures = {
    loginAsStandardUser: () => Promise<InventoryPage>;
};

export const test = base.extend<AuthFixtures>({
    loginAsStandardUser: async ({ page }, use) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('standard_user', 'secret_sauce');

        const inventory = new InventoryPage(page);
        await inventory.expectLoaded();
        await use(async () => inventory);
    },
});

export { expect };
