import { test, expect } from './fixtures/auth.fixture';
import { CartPage } from './pom/cart.page';
import { CheckoutPage } from './pom/checkout.page';
import { CompletePage } from './pom/complete.page';

test('SauceDemo • POM flow with 3 random items', async ({ loginAsStandardUser, page }) => {
    const inventory = await loginAsStandardUser();       // logged in + inventory visible

    const picked = await inventory.addRandomItemsGetNames(3);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.expectLoadedAndCount(3);
    await cart.expectContains(picked);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.fillInfoAndContinue('Abdulaziz', 'Alali', '13321');
    await checkout.expectOverviewContains(picked, 3);
    await checkout.finish();

    const complete = new CompletePage(page);
    await complete.expectThankYou();
    await complete.backHome();
});
