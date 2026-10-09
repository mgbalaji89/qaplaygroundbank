        //TM-003 Verify From Account is Mandatory test case
const { test, expect } = require('@playwright/test');

const now = Date.now();


async function login(page) {
    await page.goto('https://qaplayground.com/bank');
 
    await page.getByPlaceholder('Enter username').fill('standard_user');
    await page.getByPlaceholder('Enter password').fill('bank_sauce');
 
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/.*\/bank\/dashboard/);
}
 
test('TM-003 - Verify From Account is mandatory', async ({ page }) => {
 
    await login(page);
 
    await page.getByTestId('sidebar-link-transfer').click();

    await expect(page).toHaveURL(/.*\/bank\/transfer/);
    //await page.goto('https://qaplayground.com/bank/transfer');
    
    const toAccount = page.getByLabel('To Account');
 
    await expect(toAccount).toBeDisabled();
 
    await page.getByRole('button', { name: 'Review Transfer' }).click();
 
    await expect(
        page.getByText('Please select a From account.')
    ).toBeVisible();

    await page.waitForTimeout(10000);
    await page.screenshot({
        path: `utils/screenshots/tm003_validation_${now}.png`,
        fullPage: true
    })
});