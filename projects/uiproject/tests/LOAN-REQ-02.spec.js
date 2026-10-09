//Author : Lalith KUmar
//Module : Apply Loan
//Requirment ID : LOAN-REQ-02

const { test, expect } = require('@playwright/test');
const { LoanPage } = require('../pages/LoanPage');

test.describe('Loan Management', () => {
  test('LOAN-02 - Loan form displays all required controls', async ({ page }) => {
    const loanPage = new LoanPage(page);

    // Navigate to the login page
    await page.goto('https://qaplayground.com/bank/login');
    await test.info().attach('Login Page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });

    // Fill in the login form
    await page.locator('input[name="username"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('bank_sauce');
    await test.info().attach('Login Filled', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });

    // Click sign in
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/bank\/dashboard/);
    await expect(page.locator('[data-testid="sidebar-link-dashboard"]')).toBeVisible();
    await test.info().attach('Dashboard', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });

    // Navigate to Apply Loan page
    await loanPage.openFromDashboard();
    await loanPage.waitForLoaded();
    await test.info().attach('Apply Loan Page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });

    // Verify Apply Loan page
    await expect(loanPage.loanHeader).toBeVisible();
    await expect(page.locator('h1[data-testid="apply-loan-page-title"]')).toHaveText('Apply for a Loan');

    // Open the form before validating its dialog controls
    await loanPage.openApplyLoanForm();
    await loanPage.validateApplyLoanForm();
    await test.info().attach('Loan Form Verified', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });

    // Defensive check
    await expect(page.locator('body')).not.toContainText(/error|loading/i);
    await test.info().attach('Final Check', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });
});