import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/');
        await expect(this.page.getByTestId('login-button')).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.page.getByTestId('username').fill(username);
        await this.page.getByTestId('password').fill(password);
        await this.page.getByTestId('login-button').click();
    }
}
