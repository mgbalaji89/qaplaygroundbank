const { test, expect } = require('@playwright/test');
test('BP-003 - Verify validation when Biller is not selected', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank/login');
  await page.locator('input[name="username"]').fill('standard_user');
  await page.locator('input[name="password"]').fill('bank_sauce');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator("//span[text()='Bill Pay']").click();
  await page.locator("//span[text()='Select account']").click();
  await page.getByTestId('bill-pay-from-option')
    .first()
    .click();
  await page.getByTestId('bill-amount-input').fill('100');
  await page.getByTestId('review-bill-btn').click();
  const validationMessage = page.getByText('Please select a biller.', {
    exact: true
  });
  await expect(validationMessage).toBeVisible();
  await expect(validationMessage).toHaveText('Please select a biller.');
});
