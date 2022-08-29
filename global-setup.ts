import rimraf from "rimraf";
import path from 'path';

async function globalSetup(): Promise<void> {
    await new Promise(resolve => {
        const allureReportDir = path.join(__dirname, `report/allure/*`);
        rimraf(allureReportDir, resolve);
    });
}
export default globalSetup;