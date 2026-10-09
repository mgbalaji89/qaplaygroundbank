const { test, expect } = require('@playwright/test');

test('PROF-002 - Verify User Profile Information Is Displayed Correctly', async ({ page }) => {

    // Navigate to Login Page
    await page.goto('https://qaplayground.com/bank/login');

    // Login with Valid Credentials
    await page.locator('#login-username').fill('standard_user');
    await page.locator('#login-password').fill('bank_sauce');
    await page.getByTestId('login-submit-btn').click();

    // Verify Dashboard Page
    await expect(page).toHaveURL(/dashboard/);

    // Navigate to Profile Page
    await page.getByTestId('sidebar-link-profile').click();

    // Verify Profile Page URL
    await expect(page).toHaveURL(/profile/);

    // Verify Profile Page Title
    await expect(
        page.getByTestId('profile-page-title')
    ).toHaveText('Profile & Settings');

    // Verify Personal Information Section
    await expect(
        page.getByTestId('personal-info-section')
    ).toBeVisible();

    // Verify Username
    await expect(
        page.getByTestId('profile-username')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-username')
    ).toHaveText('standard_user');

    // Verify First Name
    await expect(
        page.getByTestId('profile-first-name')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-first-name')
    ).not.toBeEmpty();

    // Verify Last Name
    await expect(
        page.getByTestId('profile-last-name')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-last-name')
    ).not.toBeEmpty();

    // Verify Email
    await expect(
        page.getByTestId('profile-email')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-email')
    ).not.toBeEmpty();

    // Verify Phone Number
    await expect(
        page.getByTestId('profile-phone')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-phone')
    ).not.toBeEmpty();

    // Verify Address
    await expect(
        page.getByTestId('profile-address')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-address')
    ).not.toBeEmpty();

    // Verify Edit Button
    await expect(
        page.getByTestId('edit-profile-btn')
    ).toBeVisible();

    await expect(
        page.getByTestId('edit-profile-btn')
    ).toBeEnabled();

    // Capture Screenshot
    await page.screenshot({
        path: 'test-results/prof002-profile-information.png',
        fullPage: true
    });
});