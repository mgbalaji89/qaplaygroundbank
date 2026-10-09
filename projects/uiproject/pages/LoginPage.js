// projects/uiproject/pages/LoginPage.js

const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.getByTestId('login-username-input');

        this.password = page.getByTestId('login-password-input');

        this.loginButton = page.getByTestId('login-submit-btn');
    }

    async goto() {
        await this.page.goto(
            'https://qaplayground.com/bank/login',
            { waitUntil: 'domcontentloaded' }
        );
    }

    async login() {

        await this.goto();

        const username = process.env.BANK_USERNAME;
        const password = process.env.BANK_PASSWORD;

        console.log('BANK_USERNAME:', username);
        console.log('BANK_PASSWORD:', password);

        if (!username || !password) {
            throw new Error(
                'BANK_USERNAME or BANK_PASSWORD is missing. Check your .env file.'
            );
        }

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();

        await expect(this.page).toHaveURL(/dashboard/);
    }
}

module.exports = LoginPage;