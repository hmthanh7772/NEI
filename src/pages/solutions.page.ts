import { click, scrollIntoViewIfNeeded } from "@libs/actions";
import { BasePage } from "./base.page";

export class SolutionsPage extends BasePage {

    constructor() {
        super();
    }

    setLearnMoreXpath = (name: string) => `//a[text()='Learn More' and contains(@href,'${name}')]`;

    async clickLearnMore(solution: string) {
        let learnMoreXpath = this.setLearnMoreXpath(solution.toLowerCase());
        await scrollIntoViewIfNeeded(learnMoreXpath);
        await click(learnMoreXpath);
    }
}