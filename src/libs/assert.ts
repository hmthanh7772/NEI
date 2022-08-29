import { Browser, expect, Page } from "@playwright/test";
import { MyLogger } from "./logger";
import testContext from "./context";

export class Assertion {
    constructor(browser: Browser, page: Page) {
        try {
            testContext.setBrowser(browser);
            testContext.setPage(page);
        } catch (e) {
            testContext.logger.error(e.errorMessage);
        }

    }

    async assertTrue(condition: boolean, message?: string) {
        expect(condition, message).toBe(true);
    }

    async assertFalse(condition: boolean, message?: string) {
        expect(condition, message).toBe(false);
    }

    async softAssertTrue(condition: boolean, errorMessage: string) {
        expect.soft(condition, errorMessage).toBe(true);
    }

}