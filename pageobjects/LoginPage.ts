import { Page } from 'playwright';

export class LoginPage {
    private page: Page;


    tboxemail = 'input#email';
    tboxpassword = 'input#password';
    buttonSubmit = 'button[data-test-id="login"]';
    linkSignUp='span[id="loginPage_signUp"]';
    labelLanguage = "div[font-size='0']";

    // Initialize the page
    constructor(page: Page) {
        this.page = page;
    }

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Method to fill the form
    async fillloginForm(email: string, password: string) {
        await this.sleep(2000)
        await this.page.fill(this.tboxemail, email);
        await this.page.fill(this.tboxpassword, password);

    }

    // Method to submit the form
    async clickLogin() {
        await this.page.click(this.buttonSubmit);
        console.log("Login Clicked")
    }


    async clickSignUp() {
        await this.page.click(this.linkSignUp);
        console.log("Login Clicked")
    }


    async clickLanguage() {
        await this.page.click(this.labelLanguage);
    }
    




}
