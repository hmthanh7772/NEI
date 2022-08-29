import { Element } from "@element/element";
import { click, scrollIntoViewIfNeeded, waitForElementVisible } from "@libs/actions";
import { BasePage } from "./base.page";

export class ReloNewsDetailPage extends BasePage {
    constructor() {
        super();
    }

    titleXpath = "//h1";

    setTitleXpath = (title: string) => `//a[text()="${title}"]`;
    setReadMoreXpath = (href: string) => `//div[@class="EDN_readMoreButtonWrapper"]//a[@href="${href}"]`;

    async clickReadMore(articleTitle: string) {
        let articleEle = new Element(this.setTitleXpath(articleTitle));
        let articleHref = await articleEle.getAttribute("href");
        let readMoreLnkXpath = this.setReadMoreXpath(articleHref);
        await scrollIntoViewIfNeeded(readMoreLnkXpath);
        await click(readMoreLnkXpath);
    }

    async getTitle() {
        await waitForElementVisible(this.titleXpath);
        let title = await new Element(this.titleXpath).getText();
        return title;
    }

}