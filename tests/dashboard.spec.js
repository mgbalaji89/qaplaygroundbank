// tests/dashboard.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const users = require('../testdata/users.json');

test.describe('Dashboard', () => {
  // Keeps the browser open after the test (pass or fail) when KEEP_BROWSER_OPEN=1.
  // Close the Playwright Inspector window or click "Resume" to finish the run.
  test.afterEach(async ({ page }) => {
    if (process.env.KEEP_BROWSER_OPEN) {
      test.setTimeout(0); // no time limit while the browser is left open
      await page.pause();
    }
  });

  test('Verify dashboard is displayed after successful authentication', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Step 1: Open the login page and check the fields are displayed
    await loginPage.open();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

    // Steps 2 & 3: Enter valid credentials and click Sign In
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    // Step 4: Verify the user is redirected to the dashboard
    await expect(page).toHaveURL(/\/bank\/dashboard/);
    await expect(dashboardPage.dashboardContainer).toBeVisible();
    await expect(dashboardPage.welcomeMessage).toContainText('Welcome back');

    // Verify the dashboard UI loaded with no blocking error
    await expect(dashboardPage.statCards).toBeVisible();
    await expect(dashboardPage.quickActions).toBeVisible();
    await expect(dashboardPage.recentTransactions).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeVisible();
    await expect(dashboardPage.errorMessage).toHaveCount(0);
  });

  test('Verify account summary/cards are displayed for the logged-in customer', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const username = users.standardUser.username;

    await loginPage.open();
    await loginPage.login(username, users.standardUser.password);

    await expect(page).toHaveURL(/\/bank\/dashboard/);
    await expect(dashboardPage.dashboardContainer).toBeVisible();
    await expect(dashboardPage.userInfo).toHaveText(
      new RegExp(`^\\S*${username}$`)
    );

    await expect(dashboardPage.statCards).toBeVisible();
    await expect(dashboardPage.accountSummaryCards).toHaveCount(4);
    for (const card of await dashboardPage.accountSummaryCards.all()) {
      await expect(card).toContainText(/[+-]?\$[\d,]+\.\d{2}/);
    }
  });
});
