import LoginPage from "../../pages/loginPage";

const userLogin = require('../../fixtures/userLogin')

Feature('Login TSC Back Office');

Before(async ({I}) => {
    await I.amOnPage('/login')
});

Scenario('Verify that the login screen is displayed with fields for email and password.',  ({ I }) => {
    // const title = await I.grabTextFrom('//span[contains(@class, "ant-typography") and contains(@class, "css-1hk5pw4")]');
    // const title = await I.grabTextFrom('//span[@class="ant-typography css-1hk5pw4"]');
    LoginPage.assertLoginFromIsVisible();
});

Scenario.skip('Verify the user is successfully logged in and can access the application.',  ({ I }) => {
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(userLogin.username, userLogin.password)
    LoginPage.assertHomePageIsVisible()
});

Scenario.skip('Verify the user input invalid email field.',  ({ I }) => {
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(userLogin.invalidUser, userLogin.password)
    LoginPage.assertInvalidFieldIsVisible()
});

Scenario.skip('Verify the user input invalid password field.',  ({ I }) => {
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(userLogin.username, userLogin.invalidPass)
    LoginPage.assertInvalidFieldIsVisible()
});

Scenario.skip('Verify the user input empty email field.',  ({ I }) => {
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(userLogin.emptyUser, userLogin.password)
    LoginPage.assertRequiredFieldIsVisible('Email')
});

Scenario.skip('Verify the user input empty password field.',  ({ I }) => {
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(userLogin.username, userLogin.emptyPass)
    LoginPage.assertRequiredFieldIsVisible('Password')
});

Scenario.skip('Verify the user input invalid email format.',  ({ I }) => {
    LoginPage.assertLoginFromIsVisible();
    LoginPage.submitLogin(userLogin.invalidFormatEmail, userLogin.password)
    LoginPage.assertRequiredFieldIsVisible('Invalid Email')
});
