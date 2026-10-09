        //TM-004 Select To Account test case
const { test, expect } = require('@playwright/test');
const now = Date.now();

async function login(page) {
    await page.goto('https://qaplayground.com/bank');
 
    await page.getByPlaceholder('Enter username').fill('standard_user');
    await page.getByPlaceholder('Enter password').fill('bank_sauce');
 
    await page.getByRole('button', { name: 'Sign In' }).click();
 
    await expect(page).toHaveURL(/.*\/bank\/dashboard/);
}
 
test('TM-004 - Verify To Account can be selected', async ({ page }) => {
 
    await login(page);

    await page.getByTestId('sidebar-link-transfer').click();
 
    await expect(page).toHaveURL(/.*\/bank\/transfer/);
 
    const fromAccount = page.getByTestId('transfer-from-select');
 
    await fromAccount.click();
 
    await page.getByRole('option', { name: /Everyday Checking/i }).click();
 
    await fromAccount.click();
    const selectedFromAccount = page.getByRole('option', { name: /Everyday Checking/i });
    await expect( fromAccount.locator('[data-slot="select-value"]')).toHaveText('acc-checking-1');

    await page.keyboard.press('Escape');

    const toAccount = page.getByTestId('transfer-to-select');
    await expect(toAccount).toBeEnabled();

    await toAccount.click();

    const destinationAccount = page.getByRole('option', { name : /High-Yield Savings/i });
    await destinationAccount.click();

    await expect( toAccount.locator('[data-slot="select-value"]')).toHaveText('acc-savings-1');
    await page.screenshot({
        path: `utils/screenshots/tm004_validation_${now}.png`,
        fullPage: true
    })
});