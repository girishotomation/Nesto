import { Page } from 'playwright';

export class SignupPage {
  private page: Page;

  // Define selectors for the form fields
  labelLanguage = "div[font-size='0']";
  tboxfirstName = 'input#firstName';
  tboxlastName = 'input#lastName';
  tboxemail = 'input#email';
  tboxphone = 'input#phone';
  tboxpassword = 'input#password';
  tboxConfirmPassword = 'input#passwordConfirm';
  buttonSubmit = 'span[data-test-id="form_signup_createYourAccount"]';
  checkBoxAgree = 'input#checkbox_leadDistributeConsentAgreement'
  buttonCreateAccount = 'button[data-test-id="createYourAccount"]'
  ddProvince = 'div.react-select__value-container.react-select__value-container--has-value.css-ghtsao'
  errorValidation = 'span#validation_errors_isRequired'
  //optionProvince ='div#react-select-province-option-4'


  // Initialize the page
  constructor(page: Page) {
    this.page = page;
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to fill the form
  async fillSignUpForm(firstName: string, lastName: string, email: string, phone: string, province: string, password: string, confirmPassword:string,isAgree?:boolean) {
    await this.sleep(2000)
    await this.page.fill(this.tboxfirstName, firstName);
    await this.page.fill(this.tboxlastName, lastName);
    await this.page.fill(this.tboxemail, email);
    await this.page.fill(this.tboxphone, phone);
    await this.page.fill(this.tboxpassword, password);
    await this.page.fill(this.tboxConfirmPassword, confirmPassword);
    await this.page.click(this.ddProvince);
    const provinceLocator = await this.chooseProvince(province);
    await this.page.click(provinceLocator)
    if(isAgree){
      console.log("isAgree is TRUE I am clicking")
      await this.clickAgreementCheckBox();
    }    
  }

  // Method to submit the form
  async submitForm() {
    await this.page.click(this.buttonSubmit);
    console.log("Submited form")
  }


  async clickLanguage() {
    await this.page.click(this.labelLanguage);
  }


  async clickAgreementCheckBox() {
    await this.page.click(this.checkBoxAgree);
  }


  async findError() {
    await this.page.getByRole;
  }




  async chooseProvince(province: string): Promise<string> {
    let loc: string;
    switch (province.toLowerCase()) {
      case "ontario":
        loc = "div#react-select-province-option-0";
        break;
      case "quebec":
        loc = "div#react-select-province-option-1";
        break;
      case "alberta":
        loc = "div#react-select-province-option-2";
        break;
      case "british-columbia":
        loc = "div#react-select-province-option-3";
        break;
      case "manitoba":
        loc = "div#react-select-province-option-4";
        break;
      case "new brunswick":
        loc = "div#react-select-province-option-5";
        break;
      case "nova scotia":
        loc = "div#react-select-province-option-6";
        break;
      case "newfoundland and labrador":
        loc = "div#react-select-province-option-7";
        break;
      case "prince edward island":
        loc = "div#react-select-province-option-8";
        break;
      case "saskatchewan":
        loc = "div#react-select-province-option-9";
        break;
      default:
        loc = "div#react-select-province-option-0";
    }

    return loc;
  }




}
