const { test, expect } = require('@playwright/test');

test('PROF-001 - Verify User Can Successfully Access The Profile Page', async ({ page }) => {

    // Navigate to Login Page
    await page.goto('https://qaplayground.com/bank/login');

    // Enter Valid Username
    await page.locator('#login-username').fill('standard_user');

    // Enter Valid Password
    await page.locator('#login-password').fill('bank_sauce');

    // Click Login Button
    await page.getByTestId('login-submit-btn').click();

    // Verify User Is Navigated To Dashboard
    await expect(page).toHaveURL(/dashboard/);

    // Click Profile Menu
    await page.getByTestId('sidebar-link-profile').click();

    // Verify User Is Navigated To Profile Page
    await expect(page).toHaveURL(/profile/);

    // Verify Profile Page Container Is Displayed
    await expect(
        page.getByTestId('profile-page')
    ).toBeVisible();

    // Verify Profile Page Title
    await expect(
        page.getByTestId('profile-page-title')
    ).toHaveText('Profile & Settings');

    // Verify Personal Information Section Is Visible
    await expect(
        page.getByTestId('personal-info-section')
    ).toBeVisible();

    // Verify Edit Profile Button Is Visible
    await expect(
        page.getByTestId('edit-profile-btn')
    ).toBeVisible();

    // Verify Edit Profile Button Is Enabled
    await expect(
        page.getByTestId('edit-profile-btn')
    ).toBeEnabled();

    // Capture Screenshot
    await page.screenshot({
        path: 'test-results/prof001-profile-page.png',
        fullPage: true
    });

});