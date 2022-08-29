import { findLocator } from "@libs/actions";
import { Locator } from "playwright";

export class ElementList {
    protected readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }


    firstElement() {
        return this.getLocator().first();
    }

    lastElement() {
        return this.getLocator().last();
    }

    async count() {
        return await this.getLocator().count();
    }

    /**
     * 
     * @param index the n-th matching element. It's zero based, `nth(0)` selects the first element.
     */
    nthElement(index: number) {
        return this.getLocator().nth(index);
    }

    getSelector = () => {
        return this.selector;
    };

    /**
     * 
     * @returns The method returns an element locator that can be used to perform actions on the page.
     */
    getLocator = (): Locator => {
        return findLocator(this.selector);
    };
}