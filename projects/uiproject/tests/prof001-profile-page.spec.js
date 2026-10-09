import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import users from '../data/bankData.json';

test('PROF-001 - Verify User Can Successfully Access The Profile Page', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    await expect(page).toHaveURL(/dashboard/);

    await page.getByTestId('sidebar-link-profile').click();

    await expect(page).toHaveURL(/profile/);

    await expect(
        page.getByTestId('profile-page')
    ).toBeVisible();

    await expect(
        page.getByTestId('profile-page-title')
    ).toHaveText('Profile & Settings');

    await expect(
        page.getByTestId('personal-info-section')
    ).toBeVisible();

    await expect(
        page.getByTestId('edit-profile-btn')
    ).toBeVisible();

    await expect(
        page.getByTestId('edit-profile-btn')
    ).toBeEnabled();
});