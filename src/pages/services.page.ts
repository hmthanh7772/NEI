
import { Element } from "@element/element";
import { click, countElements, delay, scrollIntoViewIfNeeded, waitForElementVisible } from "@libs/actions";
import { BasePage } from "./base.page";
import { ContentPane } from "./panel/content.pane";

export class ServicesPage extends BasePage {

    contentPane: ContentPane;

    constructor() {
        super();
        this.contentPane = new ContentPane();
    }

    async canAllItemsBeExpanded(): Promise<boolean> {
        return await this.contentPane.canAllItemsBeExpanded();
    }

}