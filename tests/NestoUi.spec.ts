import { test, expect } from '@playwright/test';
import { SignupPage } from '../pageobjects/SignupPage';
import { LoginPage } from '../pageobjects/LoginPage';
import { SignUpErrorPage } from '../pageobjects/SignUpErrorsPage';
import { Utils } from '../utils/Utils';
import { AccountHomePage } from '../pageobjects/AccountHomePage';

const IS_FRENCH = false;

const signUpTestData = [
  { testcase: 'Spl Characters in Names', firstName: '$$$$%%%%%', lastName: 'Gan#$%^', email: generateRandomEmail(), phone: '4857575855', province: 'Ontario', password: 'Thisispass123$', confirmPassword: 'Thisispass123$', isAgree: true },
  { testcase: 'Empty fname', firstName: '', lastName: 'Doe', email: generateRandomEmail(), phone: '4958463', province: 'Alberta', password: 'Thisispass123$', confirmPassword: 'Thisispass123$', isAgree: false },
  { testcase: 'invalid email', firstName: 'Jane', lastName: 'Smith', email: 'incorrect email', phone: '5874957438', province: 'Saskatchewan', password: 'Thisispass123$', confirmPassword: 'Thisispass123$' },
  { testcase: 'Empty LName', firstName: 'Girish', lastName: '', email: '', phone: '5874957438', province: 'British Columbia', password: 'Thisispass123$', confirmPassword: 'Thisispass123$' },
  { testcase: 'Empty phone number', firstName: 'Girish', lastName: 'Gan', email: generateRandomEmail(), phone: '', province: 'Alberta', password: 'Thisispass123$', confirmPassword: 'Thisispass123$' },
  { testcase: 'Invalid Phone', firstName: 'Girish', lastName: 'Gan', email: generateRandomEmail(), phone: 'ABCDEFG', province: 'Ontario', password: 'Thisispass123$', confirmPassword: 'Thisispass123$' },
  { testcase: 'Mismatch Passwords', firstName: 'Girish', lastName: 'Gan', email: generateRandomEmail(), phone: '5874957438', province: 'Ontario', password: 'Thisispass123$', confirmPassword: 'Thisispass124$' },
  { testcase: 'Empty All fields', firstName: '', lastName: '', email: '', phone: '', province: 'Quebec', password: '', confirmPassword: '' },
  { testcase: 'Invalid Names', firstName: '1111111', lastName: 'Ga222', email: generateRandomEmail(), phone: '5874957438', province: 'Alberta', password: 'Thisispass123$', confirmPassword: 'Thisispass123$' },
  { testcase: 'Weak password', firstName: 'Girish', lastName: 'Gan', email: generateRandomEmail(), phone: '5874957438', province: 'Alberta', password: 'weakpassword', confirmPassword: 'weakpassword' }
];

const loginTestData = [
  { testcase: 'Invalid User', email: generateRandomEmail(), password: 'Thisispass123$' },
  { testcase: 'Empty Password', email: 'girganAPIteshk4fmt3r@email.com', password: '' },
  { testcase: 'Valid User/Wrong password', email: 'girganAPIteshk4fmt3r@email.com', password: 'wrongpasword' }
];


test.beforeEach('Test setup', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://app.qa.nesto.ca/login');
  if (IS_FRENCH) {
    await loginPage.clickLanguage();
  }
})

test.describe('Nesto UI Tests', () => {

  //Positive Tests for Sanity
  test('Nesto User SignUp Test - Positive Test', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const signupErrorsPage = new SignUpErrorPage(page)
    await loginPage.clickSignUp();
    await expect(page).toHaveTitle("nesto");
    await signupPage.fillSignUpForm('Girish', 'Gan', generateRandomEmail(), await Utils.generateRandomNumber(10), 'Ontario', 'Thisispass123$', 'Thisispass123$', false);
    await signupPage.submitForm();
    const isErrorVisible = await signupErrorsPage.isAnyErrorVisible();
    expect(isErrorVisible).toBe(false);
    await expect(page).toHaveURL("https://app.qa.nesto.ca/getaquote");
  });

  test('Nesto User Login Test - Positive Test', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const accountHomePage = new AccountHomePage(page);
    await expect(page).toHaveTitle("nesto");
    await loginpage.fillloginForm("girganAPIteshk4fmt3r@email.com", "Thisispass123$");
    await loginpage.clickLogin();
    const isPhoneVisible = await accountHomePage.isSUpportPhoneVisible();
    expect(isPhoneVisible).toBe(true);
  });

  //Data Driven Tests for Negative cases
  for (const data of signUpTestData) {
    test(`Nesto Sign Up -Negative Test - ${data.testcase}`, async ({ page }) => {
      const signupPage = new SignupPage(page);
      const loginPage = new LoginPage(page);
      const signupErrorsPage = new SignUpErrorPage(page)
      await loginPage.clickSignUp();
      await expect(page).toHaveTitle("nesto");
      await signupPage.fillSignUpForm(data.firstName, data.lastName, data.email, data.phone, data.province, data.password, data.confirmPassword, data.isAgree);
      await signupPage.clickAgreementCheckBox();
      await signupPage.submitForm();
      const isErrorVisible = await signupErrorsPage.isAnyErrorVisible();
      expect(isErrorVisible).toBe(true);
    })
  };


  for (const data of loginTestData) {
    test('Nesto User Login - Negative Test - ' + data.testcase, async ({ page }) => {
      const loginpage = new LoginPage(page);
      const signupErrorsPage = new SignUpErrorPage(page)
      await expect(page).toHaveTitle("nesto");
      await loginpage.fillloginForm(data.email, data.password);
      await loginpage.clickLogin();
      const isErrorVisible = await signupErrorsPage.isAnyErrorVisible();
      expect(isErrorVisible).toBe(true);
    });
  };
})


function generateRandomEmail(): string {
  const randomString = Math.random().toString(36).substring(2, 10); // Creates a random string
  return 'girgan' + randomString + '@example.com';
};
