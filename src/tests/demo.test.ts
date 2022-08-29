import { ExpertisePage } from '@pages/expertise.page';
import { HomePage } from '@pages/home.page';
import { OurCompanyPage } from '@pages/our.company.page';
import { ReloNewsDetailPage } from '@pages/relo.news.detail.page';
import { ReloNewsPage } from '@pages/relo.news.page';
import { ServicesPage } from '@pages/services.page';
import { SolutionsPage } from '@pages/solutions.page';
import test from '@tests/base.test';

test(`@Smoke Verify NEI home page information`, async ({ assertion }) => {
    let homePage = new HomePage();
    let ourCompanyPage = new OurCompanyPage();
    let solutionsPage = new SolutionsPage();
    let servicesPage = new ServicesPage();
    let expertisePage = new ExpertisePage();
    let reloNewsPage = new ReloNewsPage();
    let reloNewsDetailPage = new ReloNewsDetailPage();

    await test.step(`Navigate to Application`, async () => {
        // 1. Go to https://neirelo.com/home
        await homePage.navigateTo();
    });
    await test.step(`Validate the current cities time and date is displayed`, async () => {
        /* 
        2. On the home page, validate the current time and date for the following cities are displayed: 
        San Francisco, Omaha, New York City, Sao Paulo, London, Geneva, Singapore, Tokyo 
        */
        let cities: string[] = ["San Francisco", "Omaha", "New York City", "Sao Paulo", "London", "Singapore", "Tokyo"];

        for (var cityName of cities) {
            assertion.softAssertTrue(await homePage.isCityDateTimeDisplayed(cityName), `Validate current date and time of '${cityName}' is displayed correctly.`);
        }
    });

    await test.step(`Validate each opened service will close when the next one is selected`, async () => {
        // 3. Select 'About Us/Our Company'
        await homePage.selectMenu("About Us", "Our Company");

        // 4. On the 'About Us' page, scroll to the bottom of the page and select the 'Solutions' link
        await ourCompanyPage.clickFooterLink("Solutions");

        // 5. On the Solutions page, scroll down and select the 'Learn More' icon under Services
        await solutionsPage.clickLearnMore("Services");

        // 6. On the Services page, select and open each Service option (each opened service will close when the next one is selected, validate this)
        assertion.softAssertTrue(await servicesPage.canAllItemsBeExpanded(), 'Validate each opened service will be closed when the next one is selected');
    });

    await test.step(`Validate each opened expertise will close when the next one is selected`, async () => {
        /*
        Scroll to the top and select 'Why NEI/Expertise'
        Scroll down and select and open each expertise option (each opened expertise will close when the next one is selected, validate this)
        */

        await homePage.selectMenu("Why NEI", "Expertise");

        assertion.softAssertTrue(await expertisePage.canAllItemsBeExpanded(), 'Validate each opened expertise will close when the next one is selected');
    });

    await test.step(`Validate Read More link will open related article`, async () => {
        /*
        Scroll to the bottom of the page and select 'Relo News'
        Scroll down to the 'Celebrating Holidays on Assignment Promotes Adaptation and Enrichment' and select 'Read More'
        */
        let articleTitle = "Celebrating Holidays on Assignment Promotes Adaptation and Enrichment";
        await ourCompanyPage.clickFooterLink("Relo News");
        await reloNewsPage.clickReadMore(articleTitle);

        assertion.softAssertTrue(await reloNewsDetailPage.getTitle() === articleTitle, 'Validate the correct article is opened');
    });

    await test.step(`Close the browser`, async () => {
        await homePage.closeBrowser();
    });
});

