import { BasePage } from "./base.page";
import { ContentPane } from "./panel/content.pane";

export class ExpertisePage extends BasePage {
    contentPane: ContentPane;

    constructor() {
        super();
        this.contentPane = new ContentPane();
    }

    async canAllItemsBeExpanded(): Promise<boolean> {
        return await this.contentPane.canAllItemsBeExpanded();
    }

}