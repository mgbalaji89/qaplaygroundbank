const { test, expect } = require('@playwright/test');
test('BP-004 - Select From Account', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank/login');
  await page.locator('input[name="username"]').fill('standard_user');
  await page.locator('input[name="password"]').fill('bank_sauce');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('sidebar-link-bill-pay').click();
  const fromAccount = page.getByTestId('bill-pay-from-select');
  await expect(fromAccount).toBeVisible();
  await fromAccount.click();
  const checkingAccount = page.getByTestId('bill-pay-from-option')
    .filter({ hasText: 'Everyday Checking' });
  await expect(checkingAccount).toBeVisible();
  await checkingAccount.click();
  await expect(fromAccount).toContainText('acc-checking-1');
});
