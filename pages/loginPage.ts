import { Console } from "console";

const { I } = inject();

class LoginPage {
  // Locators
  pageTitle: string;
  emailLabel: string;
  passwordLabel: string;
  signInButton: string;
  emailField: string;
  passwordField: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  toastNotification: string;

  constructor() {
    // Initialize locators
    this.signInButton = '//button[@type="submit"]';
    this.pageTitle = '//span[@class="ant-typography css-1ulwx50"]';
    this.emailLabel = '//label[@class="ant-form-item-required" and text()="Email"]';
    this.passwordLabel = '//label[@class="ant-form-item-required" and text()="Password"]';
    this.emailField = '//input[@id="email"]';
    this.passwordField = '//input[@id="password"]';
    this.emailErrorMessage = "//div[@class='ant-form-item-explain-error']"
    this.passwordErrorMessage = '//div[@id="password_help"]/div[@class="ant-form-item-explain-error"]';
    this.toastNotification = '//div[@role="alert" and @class="Toastify__toast-body"]';
  }

  // Methods
  async submitLogin(username: string, password: string) {
    I.fillField(this.emailField, username);
    I.fillField(this.passwordField, password);
    I.click(this.signInButton);
  }

  async assertLoginFormIsVisible() {
    I.see("Email", this.emailLabel);
    I.see("Password", this.passwordLabel);
    I.see("Sign in", this.signInButton);
    I.see("SX Back Office", this.pageTitle);
  }

  async assertHomePageIsVisible() {
    I.see("SX Back Office", this.pageTitle);
  }

  async assertRequiredFieldIsVisible(field: 'Email' | 'Password' | 'InvalidEmail') {
    const errorMessageLocator = field === 'Password'
      ? this.passwordErrorMessage
      : this.emailErrorMessage;

    const requiredMessage = field === 'InvalidEmail'
      ? 'Invalid email address'
      : `${field} is required`;

    I.see(requiredMessage, errorMessageLocator);
  }

  async assertInvalidFieldIsVisible() {
    I.waitForElement(this.toastNotification)
    I.see("Login Failed. Please try again.", this.toastNotification);
  }
}

export default new LoginPage();