const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.setTimeout(60000);

test('TC01 - Verify To Account is mandatory', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login();

    // Open Transfer page
    await page.getByTestId('sidebar-link-transfer').click();

    await expect(page).toHaveURL(/transfer/);

    await expect(
        page.getByRole('heading', { name: 'Transfer Money' })
    ).toBeVisible();

    // Select From Account
    await page.getByRole('combobox', {
        name: 'From Account'
    }).click();

    await page.getByRole('option', {
        name: /Everyday Checking/i
    }).click();

    // Verify To Account enabled
    await expect(
        page.getByRole('combobox', {
            name: 'To Account'
        })
    ).toBeEnabled();

    // Leave To Account blank

    // Enter Amount
    await page.getByRole('spinbutton', {
        name: 'Amount'
    }).fill('100');

    // Review Transfer
    await page.getByTestId('review-transfer-btn').click();

    // Validation message
    const errorMessage =
        page.getByTestId('transfer-error-message');

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage)
        .toContainText('Please select a To account.');
});