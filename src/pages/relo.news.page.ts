import { Element } from "@element/element";
import { click, scrollIntoViewIfNeeded } from "@libs/actions";
import { BasePage } from "./base.page";

export class ReloNewsPage extends BasePage {
    constructor() {
        super();
    }

    setTitleXpath = (title: string) => `//a[text()="${title}"]`;
    setReadMoreXpath = (href: string) => `//div[@class="EDN_readMoreButtonWrapper"]//a[@href="${href}"]`;
    readMoreBtn = (title : string) => `//div[@class='EDN_article'][.//a[text()='${title}']]//a[text()='Read more']`;
    
    async clickReadMore(articleTitle: string) {
        let articleEle = new Element(this.setTitleXpath(articleTitle));
        let articleHref = await articleEle.getAttribute("href");
        let readMoreLnkXpath = this.setReadMoreXpath(articleHref);
        await scrollIntoViewIfNeeded(readMoreLnkXpath);
        await click(readMoreLnkXpath);
    }

    async clickReadMore(title : string){
        let readMoreSelector = this. readMoreBtn(title);
        await scrollIntoViewIfNeeded(readMoreSelector);
        await click(readMoreSelector);
    }


}