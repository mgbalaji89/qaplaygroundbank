const { test, expect } = require('@playwright/test');

test('Verify Send Money page navigation after login', async ({ page }) => {

    // Step 1: Open Login Page
    await page.goto('https://qaplayground.com/bank/login');

    // Step 2: Login
    await page.locator('input[name="username"]').fill('standard_user');
    await page.locator('input[name="password"]').fill('bank_sauce');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Step 3: Open Send Money
    await page.getByTestId('sidebar-link-send-money').click();

    // Step 4: Verify Page
    await expect(
        page.getByRole('heading', { name: 'Send Money' })
    ).toBeVisible();

    console.log('Send Money Page Opened Successfully');

});
