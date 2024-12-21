import LoginPage from "../../pages/loginPage";
import ApptInfoPage from "../../pages/apptInfoPage";
import { assert } from "console";

let userLogin = require("../../fixtures/userLogin");
let apptInfo = require("../../fixtures/apptInfo");
const waitForTimeout = 8

Feature('Run multiple cases without closing browser');

Before(async ({ I }) => {
  I.amOnPage("/login");
});

After(async ({ I }) => {
  console.log("TestPR")
  I.wait(waitForTimeout)
});

Scenario('Case 1: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
  // assert.equal('CodeceptJS', 'CodeceptJS');
});

Scenario('Case 2: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 3: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 4: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 5: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 6: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 7: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 8: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 9: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 10: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

Scenario('Case 11: example login', async ({ I }) => {
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});
