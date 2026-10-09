
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

const accounts = page.getByTestId('sidebar-link-accounts')
console.log('Count :', await accounts.count());

//await page.pause();
await page.getByTestId('sidebar-link-accounts').click();

await page.getByTestId('add-account-btn').click();

await page.getByTestId('account-form-name').click();

//await page.getByRole('combobox').click();

});

