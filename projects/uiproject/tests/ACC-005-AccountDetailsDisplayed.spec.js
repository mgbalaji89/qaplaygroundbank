import { test, expect } from '@playwright/test';
import { AccountPage } from '../../pages/AccountPage';
import { accountTestData } from '../../data/accountTestData';
import { assertEqualsExpected } from '../../utils/accountUtils';

test.describe('Accounts Module', () => {

    test(
        'ACC-005 | ACC-FR-02 | Account number/details are displayed correctly',
        async ({ page }) => {

            const accountPage = new AccountPage(page);

            // Preconditions
            await page.goto(process.env.BASE_URL);

            // Authentication Step
            // Replace with framework login method
            // await loginPage.login();

            // Step 1
            // Open Account

            await accountPage.openAccountPage();

            // Step 2
            // Capture displayed account identifier

            const displayedAccountId =
                await accountPage.getAccountIdentifier();

            // Step 3
            // Compare against expected data

            assertEqualsExpected(
                displayedAccountId,
                accountTestData.accountNumber
            );

            // Step 4
            // Verify complete account details

            await accountPage.verifyAccountDetails(
                accountTestData
            );

            // Expected Result Validation

            expect(displayedAccountId).toBe(
                accountTestData.accountNumber
            );
        }
    );
});