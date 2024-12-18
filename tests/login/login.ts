import LoginPage from "../../pages/loginPage";

// const userLogin = require("../../fixtures/userLogin");
let userLogin = require("../../fixtures/login");

Feature("Login SX Back Office");

Before(async ({ I }) => {
  I.amOnPage("/login");
});

Scenario(
  "Verify that the login screen is displayed with fields for email and password.",
  ({ I }) => {
    // const title = await I.grabTextFrom('//span[contains(@class, "ant-typography") and contains(@class, "css-1hk5pw4")]');
    // const title = await I.grabTextFrom('//span[@class="ant-typography css-1hk5pw4"]');
    LoginPage.assertLoginFromIsVisible();
  }
);

Scenario(
  "Verify the user is successfully logged in and can access the application.",
  ({ I }) => {
    const email = userLogin.testSuite.testCases.successLongin.input.username
    const password = userLogin.testSuite.testCases.successLongin.input.password
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(email, password);
    LoginPage.assertHomePageIsVisible();
  }
);

Scenario("Verify the user input invalid email field.", ({ I }) => {
  const email = userLogin.testSuite.testCases.invalidEmail.input.username
  const password = userLogin.testSuite.testCases.invalidEmail.input.password
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(email, password);
  LoginPage.assertInvalidFieldIsVisible();
});

Scenario("Verify the user input invalid password field.", ({ I }) => {
  const email = userLogin.testSuite.testCases.invalidPassword.input.username
  const password = userLogin.testSuite.testCases.invalidPassword.input.password
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(email, password);
  LoginPage.assertInvalidFieldIsVisible();
});

Scenario("Verify the user input empty email field.", ({ I }) => {
  const email = userLogin.testSuite.testCases.emptyEmail.input.username
  const password = userLogin.testSuite.testCases.emptyEmail.input.password
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(email, password);
  LoginPage.assertRequiredFieldIsVisible("Email");
});

Scenario("Verify the user input empty password field.", ({ I }) => {
  const email = userLogin.testSuite.testCases.emptyPassword.input.username
  const password = userLogin.testSuite.testCases.emptyPassword.input.password
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(email, password);
  LoginPage.assertRequiredFieldIsVisible("Password");
});

Scenario("Verify the user input invalid email format.", ({ I }) => {
  const email = userLogin.testSuite.testCases.invalidEmailFormat.input.username
  const password = userLogin.testSuite.testCases.invalidEmailFormat.input.password
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(email, password);
  LoginPage.assertRequiredFieldIsVisible("Invalid Email");
  console.log("test-2");
});