const { test, expect } = require('@playwright/test');
const { SecureBankLoginPage } = require('../pages/SecureBankLoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const users = require('../../../testdata/users.json');

// Keeps the browser open after the test (pass or fail) when KEEP_BROWSER_OPEN=1.
// Close the Playwright Inspector window or click "Resume" to finish the run.
test.afterEach(async ({ page }) => {
  if (process.env.KEEP_BROWSER_OPEN) {
    test.setTimeout(0); // no time limit while the browser is left open
    await page.pause();
  }
});

test('Verify account summary/cards are displayed for the logged-in customer', async ({ page }) => {
  const loginPage = new SecureBankLoginPage(page);
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
