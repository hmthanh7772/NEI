import { findLocator } from '@libs/actions';
import { Locator } from 'playwright';

export class Element {
    protected readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    getSelector = () => {
        return this.selector;
    };

    /**
     * 
     * @returns The method returns an element locator that can be used to perform actions on the page.
     */
    protected getLocator = (): Locator => {
        return findLocator(this.selector);
    };

    /**
     * 
     * @param name 
     * @returns 
     */
    async getAttribute(name: string): Promise<string> {
        return this.getLocator().getAttribute(name);
    }

    async getText(): Promise<string> {
        return this.getLocator().textContent();
    }

    async getBoundingBox(): Promise<null | { x: number, y: number, width: number, height: number }> {
        return await this.getLocator().boundingBox();
    }

    async focus() {
        await this.getLocator().focus();
    }

    async hover() {
        await this.getLocator().hover();
    }


    /**
     * 
     * @returns Returns whether the element is checked. Throws if the element is not a checkbox or radio input.
     */
    async isChecked(): Promise<boolean> {
        return this.getLocator().isChecked();
    }

    /**
     * 
     * @returns Returns whether the element is disabled
     */
    async isDisabled(): Promise<boolean> {
        return this.getLocator().isDisabled();
    }

    /**
     * 
     * @returns Returns whether the element is editable
     */
    async isEditable(): Promise<boolean> {
        return this.getLocator().isEditable();
    }

    /**
     * 
     * @returns Returns whether the element is enable
     */
    async isEnabled(): Promise<boolean> {
        return this.getLocator().isEnabled();
    }

    /**
     * 
     * @returns Returns whether the element is editable
     */
    async isHidden(): Promise<boolean> {
        return this.getLocator().isHidden();
    }

    /**
     * 
     * @returns Returns whether the element is visible
     */
    async isVisible(): Promise<boolean> {
        return await this.getLocator().isVisible();
    }


}