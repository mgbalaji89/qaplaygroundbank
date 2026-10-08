//Node's built-in helper for building file path
const path = require('path');
//defineConfig validates settings; devices gives ready-made browser profiles
const { defineConfig, devices } = require('@playwright/test');

//Load BASE_URL and BANK_PASSWORD from the root .env file
try {
    process.loadEnvFile(path.resolve(__dirname, '../../../.env'));
} catch {
    //only error expected here is .env file does not exists. 
    // on CI there will be no .env file so we will do nothing here
}

module.exports = defineConfig({
    //Folder containing the .spec.js files
    testDir: '../tests',
    //Screenshots and traces from the failed tests
    outputDir: '../../../test-results',
    //HTML  report, not opened automatically
    reporter: [['html', { outputFolder: '../../../reports/uiproject', open: 'never' }]],
    //Settings shared to every test
    use: {
        //Site address from .env, so no url is hard coded
        baseURL: process.env.BASE_URL,
        //Record a replay when a failed test is retried
        trace: 'on-first-retry',
        //Capture the screenshot when a test fails
        screenshot: 'only-on-failure',
    },
    //Browsers to run the tests on
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], channel: process.env.BROWSER_CHANNEL || undefined },
        },
    ],
});