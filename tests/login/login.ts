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
    LoginPage.assertLoginFormIsVisible();
  }
).tag('login');

Scenario(
  "Verify the user is successfully logged in and can access the application.",
  ({ I }) => {
    const loginInput = userLogin.testSuite.testCases.successLongin.input
    LoginPage.assertLoginFormIsVisible();
    LoginPage.submitLogin(loginInput.username, loginInput.password);
    LoginPage.assertHomePageIsVisible();
  }
).tag('login');

Scenario("Verify the user input invalid email field.", ({ I }) => {
  const loginInput = userLogin.testSuite.testCases.invalidEmail.input
  LoginPage.assertLoginFormIsVisible();
  LoginPage.submitLogin(loginInput.username, loginInput.password);
  LoginPage.assertInvalidFieldIsVisible();
}).tag('login');

Scenario("Verify the user input invalid password field.", ({ I }) => {
  const loginInput = userLogin.testSuite.testCases.invalidPassword.input
  LoginPage.assertLoginFormIsVisible();
  LoginPage.submitLogin(loginInput.username, loginInput.password);
  LoginPage.assertInvalidFieldIsVisible();
}).tag('login');

Scenario("Verify the user input empty email field.", ({ I }) => {
  const loginInput = userLogin.testSuite.testCases.emptyEmail.input
  LoginPage.assertLoginFormIsVisible();
  LoginPage.submitLogin(loginInput.username, loginInput.password);
  LoginPage.assertRequiredFieldIsVisible("Email");
}).tag('login');

Scenario("Verify the user input empty password field.", ({ I }) => {
  const loginInput = userLogin.testSuite.testCases.emptyPassword.input
  LoginPage.assertLoginFormIsVisible();
  LoginPage.submitLogin(loginInput.username, loginInput.password);
  LoginPage.assertRequiredFieldIsVisible("Password");
}).tag('login');

Scenario("Verify the user input invalid email format.", ({ I }) => {
  const loginInput = userLogin.testSuite.testCases.invalidEmailFormat.input
  LoginPage.assertLoginFormIsVisible();
  LoginPage.submitLogin(loginInput.username, loginInput.password);
  LoginPage.assertRequiredFieldIsVisible("InvalidEmail");
}).tag('login');