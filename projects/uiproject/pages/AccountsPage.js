import { expect } from '@playwright/test';

export class AccountsPage {
    constructor(page) {
        this.page = page;

        this.accountMenu = page.locator('text=Accounts');

        this.accountNumber = page.locator(
            '[data-testid="account-number"]'
        );

        this.accountName = page.locator(
            '[data-testid="account-name"]'
        );

        this.accountType = page.locator(
            '[data-testid="account-type"]'
        );
    }

    async navigateToAccounts() {
        await this.accountMenu.click();
    }

    async getAccountIdentifier() {
        return (await this.accountNumber.textContent()).trim();
    }

    async getAccountName() {
        return (await this.accountName.textContent()).trim();
    }

    async getAccountType() {
        return (await this.accountType.textContent()).trim();
    }

    async verifyAccountDetails(expectedData) {
        await expect(this.accountNumber)
            .toHaveText(expectedData.accountNumber);

        await expect(this.accountName)
            .toHaveText(expectedData.accountName);

        await expect(this.accountType)
            .toHaveText(expectedData.accountType);
    }
}