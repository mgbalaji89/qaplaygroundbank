const { test, expect } = require('@playwright/test');
const data = require('../data/bankData.json');
const { LoginPage } = require('../pages/LoginPage');
const { AccountsOverviewPage } = require('../pages/AccountsOverviewPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Dashboard', () => {
    test('DASH-05: negative/overdrawn balance is handled correctly', async ({ page }) => {
        // Test data comes from bankData.json; the password comes from .env
        const user = data.users.overdraft;
        const loginPage = new LoginPage(page);
        const accountsPage = new AccountsOverviewPage(page);
        const dashboard = new DashboardPage(page);

        // Step 1: log in with an account that permits a negative balance
        await loginPage.goto();
        await loginPage.login(user.username, process.env[user.passwordEnv]);
        await expect(dashboard.dashboardRoot).toBeVisible();

        // Step 2: locate the negative balance (shown per account on the Accounts page)
        await dashboard.accountsLink.click();
        const accounts = await accountsPage.readAccountBalances();
        const negatives = accounts.filter(a => DashboardPage.toNumber(a.balance) < 0);
        expect(negatives.length, 'overdraft user should have a negative balance').toBeGreaterThan(0);

        // Step 3: negative sign and currency format are correct
        for (const account of negatives) {
            const value = DashboardPage.toNumber(account.balance);
            expect(account.balance).toBe(DashboardPage.formatCurrency(value, data.currency));
            expect(account.isOverdrawn, `${account.name} should show Overdrawn`).toBe(true);
        }

        // Step 4: the negative value is not converted to positive in the dashboard total
        // Sum in cents to avoid decimal rounding errors
        const totalCents = accounts.reduce(
            (sum, a) => sum + Math.round(DashboardPage.toNumber(a.balance) * 100),
            0
        );
        await dashboard.dashboardLink.click();
        expect(await dashboard.getNetWorthText()).toBe(
            DashboardPage.formatCurrency(totalCents / 100, data.currency)
        );

        // Step 4: dashboard remains usable
        await expect(dashboard.dashboardRoot).toBeVisible();
    });
});
