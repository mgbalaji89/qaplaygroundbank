import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import users from '../data/bankData.json';

test('PROF-002 - Verify User Profile Information Is Displayed Correctly', async ({ page }) => {

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
        page.getByTestId('profile-page-title')
    ).toHaveText('Profile & Settings');

    await expect(
        page.getByTestId('profile-username')
    ).toHaveText(users.standardUser.username);

    await expect(
        page.getByTestId('profile-first-name')
    ).toHaveText('Alex');

    await expect(
        page.getByTestId('profile-last-name')
    ).toHaveText('Morgan');

    await expect(
        page.getByTestId('profile-email')
    ).toHaveText('alex.morgan@example.com');

    await expect(
        page.getByTestId('profile-phone')
    ).toHaveText('(415) 555-0101');

    await expect(
        page.getByTestId('profile-address')
    ).toHaveText('123 Market Street, San Francisco, CA 94105');
});