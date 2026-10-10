
import { test, expect } from '../fixtures/baseFixture.js';
import bankData from '../data/bankData.json' with { type: 'json' };
import { VALIDATIONS } from '../utils/constants.js';

test.describe('Profile Email Validation Tests', () => {

    test(
        'PROF-07: Verify validation error when email domain is missing',
        async ({ page, loginPage }) => {

            // Step 1: Open the login page
            await loginPage.openLoginPage();

            // Step 2: Login using the shared framework function
            await loginPage.login(
                bankData.standardUser.username,
                bankData.standardUser.password
            );

            // Step 3: Verify successful login
            await expect(page).toHaveURL(VALIDATIONS.DASHBOARD_URL);

            // Step 4: Open the Profile section
            await page.getByText('Profile', { exact: true }).click();

            // Step 5: Click the Edit button
            await page.getByTestId('edit-profile-btn').click();

            // Step 6: Locate the Email field
            const emailField = page.getByLabel('Email');

            // Step 7: Enter email with missing domain
            await emailField.fill('admin@');

            // Step 8: Click Save Changes
            await page
                .getByRole('button', { name: 'Save Changes' })
                .click();

            // Step 9: Get the browser validation message
            const validationMessage = await emailField.evaluate(
                element => element.validationMessage
            );

            // Step 10: Verify that the validation message appeared
            expect(validationMessage).not.toBe('');
            
            // Verify the profile remains in Edit mode because saving was blocked
            await expect(
            page.getByRole('button', { name: 'Save Changes' })
            ).toBeVisible();
        }
    );

});