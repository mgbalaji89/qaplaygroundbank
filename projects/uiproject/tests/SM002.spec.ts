import { test, expect } from '@playwright/test';

test('SM-002 From Account Dropdown', async ({ page }) => {

    await page.goto('https://qaplayground.com/bank/login');

    await page.getByTestId('login-username-input')
        .fill('standard_user');

    await page.getByTestId('login-password-input')
        .fill('bank_sauce');

    await page.getByRole('button', { name: /sign in/i })
        .click();

    await page.getByTestId('sidebar-link-send-money')
        .click();

    const fromAccountLabel =
        page.getByText('From Account', { exact: true });

    await expect(fromAccountLabel)
        .toBeVisible();
});