
import { Element } from '@element/element';
import { closeBrowser, navigateTo, scrollIntoViewIfNeeded, waitForElementVisible } from '@libs/actions';
import testContext from '@libs/context';
import { BasePage } from './base.page';


export class HomePage extends BasePage {

    constructor() {
        super();
    }

    setClockCityXpath = (cityName: string) => `//p[a[@class='clock24' and .="${cityName}"]]`;
    setClockTimeXpath = (cityName: string) => `//p[a[@class='clock24' and .="${cityName}"]]/following-sibling::div/div[@class='w24tz-time']`;
    setClockDateXpath = (cityName: string) => `//p[a[@class='clock24' and .="${cityName}"]]/following-sibling::div/p`;

    async navigateTo() {
        await navigateTo("home");
    }

    async closeBrowser() {
        closeBrowser();
    }

    async isCityDateTimeDisplayed(cityName: string) {
        let city = new Element(this.setClockCityXpath(cityName));
        let time = new Element(this.setClockTimeXpath(cityName));
        let date = new Element(this.setClockDateXpath(cityName));

        await waitForElementVisible(city.getSelector())
        
        let b1 = await city.isVisible();
        let b2 = await time.isVisible();
        let b3 = await date.isVisible();
        return b1 && b2 && b3;
    }
}