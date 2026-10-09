
require('dotenv').config();
const {test, expect} = require('@playwright/test');

test('Verify Funds Transfer', async({ page }) => {

    const username = process.env.BANK_USERNAME;
    const password = process.env.BANK_PASSWORD;
await page.goto('https://qaplayground.com/bank');

await page.getByPlaceholder('Enter username').fill(username);
await page.getByPlaceholder('Enter password').fill(password);

await page.getByRole('button', {name : 'Sign In'}).click();
//await expect(page).toHaveTitle('QA Playground Bank - Master Automation Testing');

//await page.pause();
await page.getByTestId('sidebar-link-accounts').click();

await page.getByTestId('add-account-btn').click();

await page.getByTestId('account-form-name-input').fill('Test Account');

await page.getByTestId('account-form-type-select').click();

const options = await page.getByTestId('account-form-type-option').allTextContents();
console.log(options);

const accountType = 'Credit'; //[ 'Checking', 'Savings', 'Credit' ]
const option = page.getByRole('option', { name: accountType});

await expect(option).toBeVisible();
await option.click();

await page.locator('input[name="account_balance_field"]').fill('5000');

await page.getByTestId('account-form-accept-terms-checkbox').check();
await page.getByTestId('save-account-form-btn').click();


//await page.pause();


});

