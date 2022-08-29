import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from '@conf/test-configuration';

const config: PlaywrightTestConfig = {
    timeout: 120000,
    //Global Setup to run before all tests
    globalSetup: `./global-setup`,
    //Global Teardown to run after all tests
    globalTeardown: `./global-teardown`,
    testDir: `./src/tests`,
    reporter: [
        [`./conf/custom-reporter-conf.ts`],
        [`allure-playwright`, { detail: true, outputFolder: "./report/allure", suiteTitle: true }],
        [`html`, { outputFolder: './report/html', open: 'never' }]],

    projects: [
        {
            name: `Chrome`,
            use: {
                //Picks Base Url based on User input
                baseURL: testConfig[`url`],
                // Configure the browser to use.
                browserName: 'chromium',
                //Chrome Browser Config
                channel: `chrome`,
                //Browser Mode
                headless: false,
                ignoreHTTPSErrors: true,
                //Enable File Downloads in Chrome
                acceptDownloads: true,
                //Artifacts
                screenshot: 'only-on-failure',
                //video: `retain-on-failure`,
                trace: `retain-on-failure`,
                // Run Chrome browser in fullscreen
                viewport: null,
                launchOptions: {
                    args: ["--start-maximized"]
                }
            },
        },
        {
            name: `Firefox`,
            use: {
                browserName: `firefox`,
                baseURL: testConfig[`url`],
                headless: true,
                viewport: { width: 1500, height: 730 },
                ignoreHTTPSErrors: true,
                acceptDownloads: true,
                screenshot: `only-on-failure`,
                video: `retain-on-failure`,
                trace: `retain-on-failure`,
                launchOptions: {
                    slowMo: 0
                }
            },
        },
        {
            name: `Edge`,
            use: {
                browserName: `chromium`,
                channel: `msedge`,
                baseURL: testConfig[`url`],
                headless: false,
                viewport: { width: 1500, height: 730 },
                ignoreHTTPSErrors: true,
                acceptDownloads: true,
                screenshot: `only-on-failure`,
                video: `retain-on-failure`,
                trace: `retain-on-failure`,
                launchOptions: {
                    slowMo: 0
                }
            },
        },
        {
            name: `WebKit`,
            use: {
                browserName: `webkit`,
                baseURL: testConfig[`url`],
                headless: true,
                viewport: { width: 1500, height: 730 },
                ignoreHTTPSErrors: true,
                acceptDownloads: true,
                screenshot: `only-on-failure`,
                video: `retain-on-failure`,
                trace: `retain-on-failure`,
                launchOptions: {
                    slowMo: 0
                }
            },
        }
    ],

};
export default config;