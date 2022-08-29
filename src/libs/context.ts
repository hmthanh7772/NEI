import { Browser, Page } from "playwright";
import { MyLogger } from "./logger";

/**
* The Singleton class defines the `getInstance` method that lets clients access the unique singleton instance.
*/
class TestContext {
    private static instance: TestContext;

    public page: Page;
    public browser: Browser;
    public logger: MyLogger;

    private constructor() {
        this.logger = new MyLogger();
    }

    setBrowser(b: Browser): void {
        this.browser = b;
    }

    setPage(p: Page): void {
        this.page = p;
    }

    static getInstance(): TestContext {
        TestContext.instance = TestContext.instance || new TestContext();
        return TestContext.instance;
    }
}

const testContext = TestContext.getInstance();
export default testContext;
