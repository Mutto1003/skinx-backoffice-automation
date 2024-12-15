const { I } = inject();

class loginPage {
  titleSX: string;
  lableEmail: string;
  lablePass: string;
  btnSingin: string;
  emailInputField: string;
  passInputField: string;
  messageEmailError: string;
  messagePassError: string;
  notiErrorMessage: string;

  constructor() {
    //insert your locators
    this.btnSingin = '//button[@type="submit"]';
    this.titleSX = '//span[@class="ant-typography css-1ulwx50"]';
    this.lableEmail = '//label[@class="ant-form-item-required"]';
    this.lablePass = '//label[@class="ant-form-item-required"]';
    this.emailInputField = '//input[@id="email"]';
    this.passInputField = '//input[@id="password"]';
    this.messageEmailError = '//div[@id="email_help"]/div[@class="ant-form-item-explain-error"]';
    this.messagePassError = '//div[@id="password_help"]/div[@class="ant-form-item-explain-error"]';
    this.notiErrorMessage = '//div[@role="alert" and @class="Toastify__toast-body"]';
  }

  // insert your methods here
  async submitLogin(username: string, password: string) {
    I.fillField(this.emailInputField, username);
    I.fillField(this.passInputField, password);
    I.click(this.btnSingin);
  }

  async assertLoginFromIsVisible() {
    I.see("Email", this.lableEmail);
    I.see("Password", this.lablePass);
    I.see("Sign in", this.btnSingin);
    I.see("SX Back Office", this.titleSX);
  }

  async assertHomePageIsVisible() {
    I.see("SX Back Office", this.titleSX);
  }

  async assertRequiredFieldIsVisible(type: string) {
    if (type == "Email") {
      I.see("Email is required", this.messageEmailError);
    } else if (type == "Password") {
      I.see("Password is required", this.messagePassError);
    } else {
      I.see("Invalid email address", this.messageEmailError);
    }
  }

  async assertInvalidFieldIsVisible() {
    await I.see("Login Failed. Please try again.", this.notiErrorMessage);
  }
}

// For inheritance
export default new loginPage();