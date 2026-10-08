import { test, expect } from '@playwright/test';
import { type } from 'node:os';
test('Verify Profile page loads for authenticated user', async ({ page }) => {
    await page.goto('https://qaplayground.com/bank');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('bank_sauce');
    await page.click('button[type="submit"]');
    //verify profile page is displayed
    await expect(page.getByText('Profile')).toBeVisible();
    await page.click('//span[text()="Profile"]');
    //Verify authunticated user to be vivible
    await expect(page.getByText('standard_user')).toBeVisible();
    await page.waitForTimeout(5000);
    

});

