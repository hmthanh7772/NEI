import { test as baseTest } from '@playwright/test';
import { Assertion } from '@libs/assert';
import { HomePage } from '@pages/home.page';

const test = baseTest.extend<{
    assertion: Assertion;
    homePage: HomePage;
}>({
    assertion: async ({ browser, page }, use) => {
        await use(new Assertion(browser, page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage());
    }
});

export default test;
