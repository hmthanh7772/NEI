import { Reporter, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";
import { MyLogger } from '../src/libs/logger';

export default class CustomReporterConfig implements Reporter {
    logger: MyLogger = new MyLogger();

    onTestBegin(test: TestCase): void {
        this.logger.info(`Test Case Started : ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        this.logger.info(`Test Case Completed : ${test.title} Status : ${result.status}`);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === `test.step`) {
            this.logger.info(`Executing Step : ${step.title}`);
        }
    }

    onError(error: TestError): void {
        this.logger.error(error.message);
    }

    onInfo(info: TestError): void {
        this.logger.info(info.message);
    }
}