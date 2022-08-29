import { testConfig } from '@conf/test-configuration';
import testContext from './context';
import path from 'path';
import { Element } from '@element/element';
import { Locator } from 'playwright';

export const findLocator = (selector: string) => {
    return testContext.page.locator(selector);
}

export const doubleClick = async (selector: string) => {
    await testContext.page.dblclick(selector);
};

export const click = async (selector: string) => {
    await testContext.page.click(selector);
};

export const clickByJS = async (selector: string) => {
    await testContext.page.$eval(selector, (element: HTMLElement) => element.click());
}

export const clickElementBoundingBox = async (selector: string) => {
    delay(1000);
    const elementHandle = await testContext.page.$(selector);
    const box = await elementHandle.boundingBox();
    await testContext.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

/**
 * Returns the number of elements matching given selector.
 */
export const countElements = async (selector: string) => {
    return (await testContext.page.$$(selector)).length;
};

export const fillText = async (selector: string, text: string): Promise<void> => {
    await testContext.page.fill(selector, text);
}

export const typeText = async (selector: string, text: string): Promise<void> => {
    await testContext.page.type(selector, text);
}

export const dragAndDrop = async (dragselector: string, dropselector: string) => {
    await testContext.page.dragAndDrop(dragselector, dropselector);
}

export const focus = async (selector: string): Promise<void> => {
    await testContext.page.focus(selector, { strict: true });
}

/**
* ```js
* await page.press('body', 'A');
* await page.press('body', 'ArrowLeft');
* await page.press('body', 'Shift+O');
* ```
 * @param element 
 * @param key https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 */
export const focusAndPress = async (selector: string, key: string): Promise<void> => {
    await testContext.page.press(selector, key);
}

export const getText = async (selector: string): Promise<string> => {
    return await testContext.page.$eval(selector, item => item.textContent.trim());
}

export const getTextAll = async (locator: string): Promise<string[]> => {
    return await testContext.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
}

export const hover = async (selector: string) => {
    await testContext.page.hover(selector);
}

export const scrollIntoViewIfNeeded = async (selector: string): Promise<void> => {
    await findLocator(selector).scrollIntoViewIfNeeded({ timeout: testConfig.waitForElement })
        .catch((e) => {
            testContext.logger.error(`Failed to scroll element into view: ${selector}`);
            throw e;
        });;
}

export const closeBrowser = async () => {
    await testContext.browser.close();
};

export const navigateTo = async (url: string) => {
    await testContext.page.goto(url, { timeout: 120000 });
};

export const delay = async (time: number) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

export const downloadFile = async (locator: string): Promise<string> => {
    const [download] = await Promise.all([
        testContext.page.waitForEvent(`download`),
        testContext.page.click(locator)
    ]);
    await download.saveAs(path.join(__dirname, testConfig.downloadDir, download.suggestedFilename()));
    return download.suggestedFilename();
}

export const waitForElementVisible = async (selector: string): Promise<void> => {
    await findLocator(selector).waitFor({ state: 'visible', timeout: testConfig.waitForElement })
        .catch((e) => {
            testContext.logger.error(`Check element visible failed: ${selector}`);
            throw e;
        });;
}