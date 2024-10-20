import { Page } from 'playwright';

export class AccountHomePage {
    private page: Page;


    linkSuportPhone = 'a[href="tel:1-833-452-3541"]';

    // Initialize the page
    constructor(page: Page) {
        this.page = page;
    }   

    async isElementVisible(selector: string, timeout: number = 2000): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout });
            return true; 
        } catch {
            return false; 
        }
    }

    async isSUpportPhoneVisible(): Promise<boolean> {
        return this.isElementVisible(this.linkSuportPhone); // Use the generic method
    }







}