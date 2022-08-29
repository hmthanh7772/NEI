import { Element } from "@element/element";
import { ElementList } from "@element/elements";
import { click, delay, getText, scrollIntoViewIfNeeded, waitForElementVisible } from "@libs/actions";
import testContext from "@libs/context";
import { MyLogger } from "@libs/logger";
import { child } from "winston";

export class ContentPane {

    parentPanelSelector = `.ContentPane`;
    contentPanelSelector = `${this.parentPanelSelector} .panel-group .panel-default`;
    panelTitleSelector = (index: number) => `${this.contentPanelSelector}:nth-child(${index}) .panel-title`;
    panelBodySelector = (index: number) => `${this.contentPanelSelector}:nth-child(${index}) .panel-collapse`;

    async canAllItemsBeExpanded(): Promise<boolean> {
        // wait for the content panel's appearance
        await waitForElementVisible(this.parentPanelSelector);

        // count the child panel
        let listItems = new ElementList(this.contentPanelSelector);
        let totalItems = await listItems.count();

        for (let index = 1; index <= totalItems; index++) {
            let titleSelector = this.panelTitleSelector(index);
            // click to open an item by index
            await scrollIntoViewIfNeeded(titleSelector);
            await click(titleSelector);
            await delay(1000);

            // check current item be expanded or not
            let isExpanded = await this.isExpanded(this.panelBodySelector(index));
            if (!isExpanded) {
                let text = await getText(`${this.panelTitleSelector(index)} a`);
                testContext.logger.error(`Item '${text}' is not expanded after clicking it.`);
                return false;
            }
            // check other item be collapsed or not
            for (let other = 1; other <= totalItems; other++) {
                if (other == index)
                    continue;
                let isCollapsed = await this.isCollapsed(this.panelBodySelector(other));
                if (!isCollapsed) {
                    let text = await getText(`${this.panelTitleSelector(other)} a`);
                    testContext.logger.error(`Item '${text}' is not collapsed after another one is expanded.`);
                    return false;
                }
            }
        }

        return true;
    }

    async isExpanded(selector: string): Promise<boolean> {
        let element = new Element(selector);
        let itemClass = await element.getAttribute("class");
        return itemClass.includes("collapse in");
    }

    async isCollapsed(selector: string): Promise<boolean> {
        let element = new Element(selector);
        let itemClass = await element.getAttribute("class");
        return !itemClass.includes("collapse in");
    }
}