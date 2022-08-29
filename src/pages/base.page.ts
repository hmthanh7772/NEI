import { Element } from '@element/element';
import { click, delay, fillText, hover, scrollIntoViewIfNeeded, waitForElementVisible } from '@libs/actions';
import { ElementList } from "@element/elements";

export class BasePage {

    constructor() {

    }


    getMenuXpath = (menu: string) => `//div[@class='dnngo_gomenu']//span[text()='${menu}']`;
    getFooterLinkXpath = (footer: string) => `//div[@class='footer_nav']//a[.='${footer}']`;

    async selectMenu(caption: string, subItem: string) {
        let menuXpath = this.getMenuXpath(caption);
        let subMenuXpath = this.getMenuXpath(subItem)
        await waitForElementVisible(menuXpath);
        await hover(menuXpath);
        await delay(500);
        await click(subMenuXpath);

    }

    async clickFooterLink(footerName: string) {
        let footerLinkXpath = this.getFooterLinkXpath(footerName);
        await scrollIntoViewIfNeeded(footerLinkXpath);
        await click(footerLinkXpath);
    }


}