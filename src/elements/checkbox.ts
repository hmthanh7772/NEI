import { Element } from "./element";

/**
 * checkbox or a radio input
 */
export class Checkbox extends Element {

    constructor(selector: string) {
        super(selector)
    }

    async check(): Promise<void> {
        return this.getLocator().check();
    }

    async uncheck(): Promise<void> {
        return this.getLocator().uncheck();
    }
}