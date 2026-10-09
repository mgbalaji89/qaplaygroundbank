import { test, expect } from '@playwright/test';

test('SM-001 Open Send Money', async ({ page }) => {

    await page.goto('https://qaplayground.com/bank/login');

    await page.getByTestId('login-username-input')
        .fill('standard_user');

    await page.getByTestId('login-password-input')
        .fill('bank_sauce');

    await page.getByRole('button', { name: /sign in/i })
        .click();

    await page.getByTestId('sidebar-link-send-money')
        .click();

    await expect(
        page.getByText('From Account', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Payee', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Amount', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Review & Send' })
    ).toBeVisible();

    await expect(
        page.getByRole('button', { name: 'Cancel' })
    ).toBeVisible();
});