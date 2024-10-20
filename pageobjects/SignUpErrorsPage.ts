// ErrorPage.ts
import { Page } from '@playwright/test';
import { Utils } from '../utils/Utils';

export class SignUpErrorPage {
    private page: Page;
    private errorSelectors: string[];

    constructor(page: Page) {
        this.page = page;
        this.errorSelectors = [
            '[data-test-id="form-error-lastName"]',
            '[data-test-id="form-error-firstName"]',
            '[data-test-id="form-error-phone"]',
            '[data-test-id="form-error-email"]',
            '[data-test-id="form-error-password"]',
            '[data-test-id="form-error-passwordConfirm"]',
            '[data-test-id="form-error-email"]',
            '[data-test-id="toasts_invalidPassword_message"]',

        ];
    }

    async isAnyErrorVisible(): Promise<boolean> {
        console.log("into Error method")
        for (const selector of this.errorSelectors) {
            await Utils.sleep(100);
            const isVisible = await this.page.isVisible(selector);
            if (isVisible) {
                return true;
            }
        }
        return false;
    }
}
