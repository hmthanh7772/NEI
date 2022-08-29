import { Element } from "@element/element";
import { ElementList } from "@element/elements";
import { click, delay, getText, scrollIntoViewIfNeeded, waitForElementVisible } from "@libs/actions";
import testContext from "@libs/context";
import { MyLogger } from "@libs/logger";
import { child } from "winston";

export class ContentPane {

    parentPanelSelector = `.ContentPane`;
    contentPanelSelector = `${this.parentPanelSelector} .panel-group .panel-default`;
    collapseItemXpath = "//div[contains(@id,'accordion')]//a";

    panelTitleSelector = (index: number) => `${this.contentPanelSelector}:nth-child(${index}) .panel-title`;
    panelBodySelector = (index: number) => `${this.contentPanelSelector}:nth-child(${index}) .panel-collapse`;
    setItemLocator = (index: number) => `(//div[contains(@id,'accordion')]//a)[${index}]`;

    async canAllItemsBeExpanded() {
        let firstPlusIconXpath = this.setItemLocator(1) + "//span";
        let firstItemEle = new Element(this.setItemLocator(1));
        
        let a1 = null;
        let a2 = null;
        let a3 = null;

        // Select the first item and validate the first item canbe expanded.
        await waitForElementVisible(firstPlusIconXpath);
        await click(firstPlusIconXpath);
        delay(500);
        a1 = await this.isItemExpanded(firstItemEle);

        // Select remaining items and validate each opened item will close when the next one is selected.
        let listItems = new ElementList(this.collapseItemXpath);
        let totalItems = await listItems.count();

        for (let i = 2; i < totalItems + 1; i++) {
            let plusIconXpath = this.setItemLocator(i) + "//span";
            await click(plusIconXpath);
            delay(500);

            let currentItemEle = new Element(this.setItemLocator(i));
            let previousItemEle = new Element(this.setItemLocator(i - 1));
            a2 = await this.isItemExpanded(currentItemEle);
            a3 = await this.isItemCollapsed(previousItemEle);
            if (a2 == false || a3 == false)
                return false;
        };
        return a1;
    }

    async isItemExpanded(item: Element) {
        let itemClass = await item.getAttribute("class");
        return itemClass === "";
    }

    async isItemCollapsed(item: Element) {
        let itemClass = await item.getAttribute("class");
        return itemClass === "collapsed";
    }

}