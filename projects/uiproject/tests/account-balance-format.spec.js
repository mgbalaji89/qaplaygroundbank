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

test('Account balance is displayed with valid currency format', async ({ page }) => {
  const loginPage = new SecureBankLoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login(users.standardUser.username, users.standardUser.password);

  await expect(page).toHaveURL(/\/bank\/dashboard/);
  await expect(dashboardPage.dashboardContainer).toBeVisible();
  await expect(dashboardPage.accountSummaryCards).toHaveCount(4);

  const cards = await dashboardPage.accountSummaryCards.all();
  const displayedValues = [];

  for (const card of cards) {
    const value = dashboardPage.accountSummaryValue(card);
    await expect(value).toBeVisible();

    const text = (await value.textContent())?.trim() ?? '';
    expect(text).toMatch(/^[+-]?\$(?:\d{1,3}(?:,\d{3})+|\d+)\.\d{2}$/);
    expect(Number(text.replace(/[$,]/g, ''))).not.toBeNaN();
    expect(await dashboardPage.isAccountSummaryValueDisplayedWithoutOverlap(value)).toBe(true);
    displayedValues.push(text);
  }

  expect(displayedValues[0]).toBe(users.standardUser.expectedDashboardNetWorth);
});
