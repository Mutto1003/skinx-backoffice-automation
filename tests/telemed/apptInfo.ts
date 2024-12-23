import LoginPage from "../../pages/loginPage";
import ApptInfoPage from "../../pages/apptInfoPage";

let userLogin = require("../../fixtures/userLogin");
let apptInfo = require("../../fixtures/apptInfo");
const waitForTimeout = 10

Feature("Appt Info");

Before(async ({ I }) => {
  I.amOnPage("/login");
  // I.wait(waitForTimeout)
  LoginPage.assertLoginFormIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

After(async ({ I }) => {
  I.wait(waitForTimeout)
});

Scenario("Verify the display default of the appointment info page.",async ({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
}).tag('apptInfo');

Scenario("Verify the doctor search is not in the database.",async ({ I }) => {
  const searchType = apptInfo.testSuite.testCases.doctorInfoMissing.searchType;
  const doctorName = apptInfo.testSuite.testCases.doctorInfoMissing.input.doctorName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, doctorName);
  ApptInfoPage.assertResultNotFound();
}).tag('apptInfo');

Scenario("Verify the doctor search is in the database.",async ({ I }) => {
  const searchType = apptInfo.testSuite.testCases.doctorInfoComplete.searchType;
  const doctorName = apptInfo.testSuite.testCases.doctorInfoComplete.input.doctorName;
  const expectedDoctorName = apptInfo.testSuite.testCases.doctorInfoComplete.expectedOutput.doctorName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, doctorName);
  const rowCount = ApptInfoPage.getRowCount()
  ApptInfoPage.assertApptDetailsVisible(searchType, expectedDoctorName, rowCount)
}).tag('smoke');

Scenario("Verify the patient search is not in the database.",async ({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoMissing.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoMissing.input.patientName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, patientName);
  ApptInfoPage.assertResultNotFound();
}).tag('smoke');

Scenario("Verify the patient search is in the database.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  const expectedPatientName = apptInfo.testSuite.testCases.patientInfoComplete.expectedOutput.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  const rowCount = ApptInfoPage.getRowCount()
  await ApptInfoPage.assertApptDetailsVisible(searchType, expectedPatientName, rowCount)
}).tag('smoke');

Scenario("Verify the default appointment status selected.", async({ I }) => {
  I.waitForElement(ApptInfoPage.apptSelect)
  I.see('Show All', ApptInfoPage.apptSelect)
}).tag('smoke');

// Scenario("Verify the select appointment status is waiting confirm.", async({ I }) => {

// });

// Scenario("Verify the select appointment status is confirmed.", async({ I }) => {

// });

// Scenario("Verify the select appointment status is canceled.", async({ I }) => {

// });

Scenario("Verify the default consultation status selected.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn)
  I.click(ApptInfoPage.moreOptionsBtn)
  I.see('Show All', ApptInfoPage.apptSelect)
}).tag('smoke');

// Scenario("Verify the select consultation status is in progress.", async({ I }) => {

// });

// Scenario("Verify the select consultation status is wait to summarize.", async({ I }) => {

// });

// Scenario("Verify the select consultation status is wait to payment.", async({ I }) => {

// });

// Scenario("Verify the select consultation status is completed.", async({ I }) => {

// });

// Scenario("Verify the select consultation status is failed.", async({ I }) => {

// });

Scenario("Verify the functionality button is reset to default.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.resetBtn);
  I.click(ApptInfoPage.resetBtn)
  ApptInfoPage.assertApptInfoPageIsVisible();
}).tag('smoke');

Scenario("Verify the selected start date in the date picker.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn);
  I.click(ApptInfoPage.moreOptionsBtn);
  I.seeElement(ApptInfoPage.collapseOptionsBtn);
  I.waitForElement(ApptInfoPage.apptStart)
  I.click(ApptInfoPage.apptStart)
  I.fillField(ApptInfoPage.apptStart, '1 Dec 2024')
  I.click(ApptInfoPage.searchTitle)
}).tag('smoke');

Scenario("Verify the selected end date in the date picker.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn);
  I.click(ApptInfoPage.moreOptionsBtn);
  I.seeElement(ApptInfoPage.collapseOptionsBtn);
  I.waitForElement(ApptInfoPage.apptEnd)
  I.click(ApptInfoPage.apptEnd)
  I.fillField(ApptInfoPage.apptEnd, '1 Dec 2024')
  I.click(ApptInfoPage.searchTitle)
}).tag('smoke');

Scenario("Verify the selected start and end date in the date picker.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn);
  I.click(ApptInfoPage.moreOptionsBtn);
  I.seeElement(ApptInfoPage.collapseOptionsBtn);
  I.waitForElement(ApptInfoPage.apptStart)
  I.waitForElement(ApptInfoPage.apptEnd)
  I.click(ApptInfoPage.apptStart)
  I.fillField(ApptInfoPage.apptStart, '1 Dec 2024')
  I.click(ApptInfoPage.apptEnd)
  I.fillField(ApptInfoPage.apptEnd, '30 Dec 2024')
  I.click(ApptInfoPage.searchTitle)
}).tag('smoke');

Scenario("Verify 35-day range limit.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn);
  I.click(ApptInfoPage.moreOptionsBtn);
  I.seeElement(ApptInfoPage.collapseOptionsBtn);
  I.waitForElement(ApptInfoPage.apptStart)
  I.waitForElement(ApptInfoPage.apptEnd)
  I.click(ApptInfoPage.apptStart)
  I.fillField(ApptInfoPage.apptStart, '1 Dec 2024')
  I.click(ApptInfoPage.apptEnd)
  I.fillField(ApptInfoPage.apptEnd, '30 Dec 2024')
  I.click(ApptInfoPage.searchTitle)
}).tag('smoke');

Scenario("Verify Export button behavior.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.exportBtn);
  I.click(ApptInfoPage.exportBtn);
  I.waitForElement(ApptInfoPage.exportModal);
}).tag('smoke');

Scenario("Verify cancel button behavior.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.exportBtn);
  I.click(ApptInfoPage.exportBtn);
  I.waitForElement(ApptInfoPage.exportModal);
  I.waitForElement(ApptInfoPage.cancelModalBtn);
  I.click(ApptInfoPage.cancelModalBtn);
}).tag('smoke');

Scenario("Verify close button functionality.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.exportBtn);
  I.click(ApptInfoPage.exportBtn);
  I.waitForElement(ApptInfoPage.exportModal);
  I.waitForElement(ApptInfoPage.closeModalBtn);
  I.click(ApptInfoPage.closeModalBtn);
}).tag('smoke');

Scenario("Verify the search a empty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.rowsPerPageBtn);
  I.waitForElement(ApptInfoPage.rowsPerPageBtn)
  I.click(ApptInfoPage.rowsPerPageBtn)
  I.fillField(ApptInfoPage.searchPageRows, ' ')
  I.pressKey('Enter');
  I.seeElement('//span[@class="ant-select-selection-item" and text()="10 / page"]')
}).tag('smoke');

Scenario("Verify the search rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.rowsPerPageBtn);
  I.waitForElement(ApptInfoPage.rowsPerPageBtn)
  I.click(ApptInfoPage.rowsPerPageBtn)
  I.fillField(ApptInfoPage.searchPageRows, '20')
  I.pressKey('Enter');
  I.seeElement('//span[@class="ant-select-selection-item" and text()="20 / page"]')
}).tag('smoke');

Scenario("Verify the fifty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.rowsPerPageBtn);
  I.waitForElement(ApptInfoPage.rowsPerPageBtn)
  I.click(ApptInfoPage.rowsPerPageBtn)
  ApptInfoPage.assertRowsPerPageVisible(50)
}).tag('smoke');

Scenario("Verify the thirty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.rowsPerPageBtn);
  I.waitForElement(ApptInfoPage.rowsPerPageBtn)
  I.click(ApptInfoPage.rowsPerPageBtn)
  ApptInfoPage.assertRowsPerPageVisible(30)
}).tag('smoke');

Scenario("Verify the twenty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.rowsPerPageBtn);
  I.waitForElement(ApptInfoPage.rowsPerPageBtn)
  I.click(ApptInfoPage.rowsPerPageBtn)
  ApptInfoPage.assertRowsPerPageVisible(20)
}).tag('smoke');

Scenario("Verify the ten rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.rowsPerPageBtn);
  I.waitForElement(ApptInfoPage.rowsPerPageBtn)
  I.click(ApptInfoPage.rowsPerPageBtn)
  ApptInfoPage.assertRowsPerPageVisible(10)
}).tag('smoke');

Scenario("Verify the click number of the pagination.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo('//li[@title="2"]');
  I.waitForElement('//li[@title="2"]')
  I.click('//li[@title="2"]')
  I.seeElement('//li[@class="ant-pagination-item ant-pagination-item-2 ant-pagination-item-active"]')
}).tag('smoke');

Scenario("Verify the click prev to page of the pagination.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.nextPageBtn);
  I.waitForElement(ApptInfoPage.nextPageBtn)
  I.click(ApptInfoPage.nextPageBtn)
  I.waitForElement(ApptInfoPage.prevPageBtn)
  I.click(ApptInfoPage.prevPageBtn)
  I.seeElement('//li[@class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"]')
}).tag('smoke');

Scenario("Verify the click next to page of the pagination.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.nextPageBtn);
  I.waitForElement(ApptInfoPage.nextPageBtn)
  I.click(ApptInfoPage.nextPageBtn)
  I.seeElement('//li[@class="ant-pagination-item ant-pagination-item-2 ant-pagination-item-active"]')
}).tag('smoke');

Scenario("Verify the clear text in the search patient field.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.doctorInfoComplete.searchType;
  const doctorName = apptInfo.testSuite.testCases.doctorInfoComplete.input.doctorName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, doctorName);
  I.waitForElement(ApptInfoPage.clearTextBtn);
  I.click(ApptInfoPage.clearTextBtn);
  I.pressKey('Enter');
  ApptInfoPage.assertApptInfoPageIsVisible();
}).tag('smoke');

Scenario("Verify the clear text in the search doctor field.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.clearTextBtn);
  I.click(ApptInfoPage.clearTextBtn);
  I.pressKey('Enter');
  ApptInfoPage.assertApptInfoPageIsVisible();
}).tag('smoke');

Scenario("Verify the click the collapse option.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn);
  I.click(ApptInfoPage.moreOptionsBtn);
  I.waitForElement(ApptInfoPage.collapseOptionsBtn);
  I.click(ApptInfoPage.collapseOptionsBtn);
  I.seeElement(ApptInfoPage.moreOptionsBtn);
}).tag('smoke');

Scenario("Verify the click the more option.", async({ I }) => {
  I.waitForElement(ApptInfoPage.moreOptionsBtn);
  I.click(ApptInfoPage.moreOptionsBtn);
  I.seeElement(ApptInfoPage.collapseOptionsBtn);
}).tag('smoke');
