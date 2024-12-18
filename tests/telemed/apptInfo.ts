import LoginPage from "../../pages/loginPage";
import ApptInfoPage from "../../pages/apptInfoPage";

let userLogin = require("../../fixtures/userLogin");
let apptInfo = require("../../fixtures/apptInfo");
const waitForTimeout = 8

Feature("Telemed: Appt. Info");

Before(async ({ I }) => {
  I.amOnPage("/login");
  LoginPage.assertLoginFromIsVisible();
  LoginPage.submitLogin(userLogin.username, userLogin.password);
  LoginPage.assertHomePageIsVisible();
  ApptInfoPage.onMenuClick(apptInfo.testSuite.menuTitle);
  ApptInfoPage.onMenuClick(apptInfo.testSuite.subMenu);
});

After(async ({ I }) => {
  console.log("Test006")
  I.wait(waitForTimeout)
});

Scenario("Verify the display default of the appointment info page.",async ({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
});

Scenario("Verify the doctor search is not in the database.",async ({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoMissing.searchType;
  const doctorName = apptInfo.testSuite.testCases.patientInfoMissing.input.doctorName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, doctorName);
  ApptInfoPage.assertResultNotFound();
});

Scenario("Verify the doctor search is in the database.",async ({ I }) => {
  const searchType = apptInfo.testSuite.testCases.doctorInfoComplete.searchType;
  const doctorName = apptInfo.testSuite.testCases.doctorInfoComplete.input.doctorName;
  const expectedDoctorName = apptInfo.testSuite.testCases.doctorInfoComplete.expectedOutput.doctorName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, doctorName);
  const rowCount = ApptInfoPage.getRowCount()
  ApptInfoPage.assertApptDetailsVisible(searchType, expectedDoctorName, rowCount)
});

Scenario("Verify the patient search is not in the database.",async ({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoMissing.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoMissing.input.patientName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, patientName);
  ApptInfoPage.assertResultNotFound();
});

Scenario("Verify the patient search is in the database.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  const expectedPatientName = apptInfo.testSuite.testCases.patientInfoComplete.expectedOutput.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  const rowCount = ApptInfoPage.getRowCount()
  await ApptInfoPage.assertApptDetailsVisible(searchType, expectedPatientName, rowCount)
});

Scenario("Verify the default appointment status selected.", async({ I }) => {
  I.waitForElement(ApptInfoPage.appointmentSelect, 3)
  I.see('Show All', ApptInfoPage.appointmentSelect)
});

// Scenario("Verify the select appointment status is waiting confirm.", async({ I }) => {

// });

// Scenario("Verify the select appointment status is confirmed.", async({ I }) => {

// });

// Scenario("Verify the select appointment status is canceled.", async({ I }) => {

// });

Scenario("Verify the default consultation status selected.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3)
  I.click(ApptInfoPage.btnMoreOption)
  I.see('Show All', ApptInfoPage.appointmentSelect)
});

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
  I.waitForElement(ApptInfoPage.btnReset, 3);
  I.click(ApptInfoPage.btnReset)
  ApptInfoPage.assertApptInfoPageIsVisible();
});

Scenario("Verify the selected start date in the date picker.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3);
  I.click(ApptInfoPage.btnMoreOption);
  I.seeElement(ApptInfoPage.btnCollapseOption);
  I.waitForElement(ApptInfoPage.appointmentAt, 3)
  I.click(ApptInfoPage.appointmentAt)
  I.fillField(ApptInfoPage.appointmentAt, '1 Dec 2024')
  I.click(ApptInfoPage.titleSearch)
});

Scenario("Verify the selected end date in the date picker.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3);
  I.click(ApptInfoPage.btnMoreOption);
  I.seeElement(ApptInfoPage.btnCollapseOption);
  I.waitForElement(ApptInfoPage.appointmentEnd, 3)
  I.click(ApptInfoPage.appointmentEnd)
  I.fillField(ApptInfoPage.appointmentEnd, '1 Dec 2024')
  I.click(ApptInfoPage.titleSearch)
});

Scenario("Verify the selected start and end date in the date picker.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3);
  I.click(ApptInfoPage.btnMoreOption);
  I.seeElement(ApptInfoPage.btnCollapseOption);
  I.waitForElement(ApptInfoPage.appointmentAt, 3)
  I.waitForElement(ApptInfoPage.appointmentEnd, 3)
  I.click(ApptInfoPage.appointmentAt)
  I.fillField(ApptInfoPage.appointmentAt, '1 Dec 2024')
  I.click(ApptInfoPage.appointmentEnd)
  I.fillField(ApptInfoPage.appointmentEnd, '30 Dec 2024')
  I.click(ApptInfoPage.titleSearch)
});

Scenario("Verify 35-day range limit.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3);
  I.click(ApptInfoPage.btnMoreOption);
  I.seeElement(ApptInfoPage.btnCollapseOption);
  I.waitForElement(ApptInfoPage.appointmentAt, 3)
  I.waitForElement(ApptInfoPage.appointmentEnd, 3)
  I.click(ApptInfoPage.appointmentAt)
  I.fillField(ApptInfoPage.appointmentAt, '1 Dec 2024')
  I.click(ApptInfoPage.appointmentEnd)
  I.fillField(ApptInfoPage.appointmentEnd, '30 Dec 2024')
  I.click(ApptInfoPage.titleSearch)
});

Scenario("Verify Export button behavior.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.btnExportFile, 3);
  I.click(ApptInfoPage.btnExportFile);
  I.waitForElement(ApptInfoPage.modalExport, 3);
});

Scenario("Verify cancel button behavior.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.btnExportFile, 3);
  I.click(ApptInfoPage.btnExportFile);
  I.waitForElement(ApptInfoPage.modalExport, 3);
  I.waitForElement(ApptInfoPage.btnModalCancel, 3);
  I.click(ApptInfoPage.btnModalCancel);
});

Scenario("Verify close button functionality.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  await ApptInfoPage.assertApptInfoPageIsVisible();
  await ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.btnExportFile, 3);
  I.click(ApptInfoPage.btnExportFile);
  I.waitForElement(ApptInfoPage.modalExport, 3);
  I.waitForElement(ApptInfoPage.btnModalClose, 3);
  I.click(ApptInfoPage.btnModalClose);
});

Scenario("Verify the search a empty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnRowPage);
  I.waitForElement(ApptInfoPage.btnRowPage, 3)
  I.click(ApptInfoPage.btnRowPage)
  I.fillField(ApptInfoPage.searchRowPage, ' ')
  I.pressKey('Enter');
  I.seeElement('//span[@class="ant-select-selection-item" and text()="10 / page"]')
});

Scenario("Verify the search rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnRowPage);
  I.waitForElement(ApptInfoPage.btnRowPage, 3)
  I.click(ApptInfoPage.btnRowPage)
  I.fillField(ApptInfoPage.searchRowPage, '20')
  I.pressKey('Enter');
  I.seeElement('//span[@class="ant-select-selection-item" and text()="20 / page"]')
});

Scenario("Verify the fifty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnRowPage);
  I.waitForElement(ApptInfoPage.btnRowPage, 3)
  I.click(ApptInfoPage.btnRowPage)
  ApptInfoPage.assertRowsPerPageVisible(50)
});

Scenario("Verify the thirty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnRowPage);
  I.waitForElement(ApptInfoPage.btnRowPage, 3)
  I.click(ApptInfoPage.btnRowPage)
  ApptInfoPage.assertRowsPerPageVisible(30)
});

Scenario("Verify the twenty rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnRowPage);
  I.waitForElement(ApptInfoPage.btnRowPage, 3)
  I.click(ApptInfoPage.btnRowPage)
  ApptInfoPage.assertRowsPerPageVisible(20)
});

Scenario("Verify the ten rows per page of the table.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnRowPage);
  I.waitForElement(ApptInfoPage.btnRowPage, 3)
  I.click(ApptInfoPage.btnRowPage)
  ApptInfoPage.assertRowsPerPageVisible(10)
});

Scenario("Verify the click number of the pagination.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo('//li[@title="2"]');
  I.waitForElement('//li[@title="2"]', 3)
  I.click('//li[@title="2"]')
  I.seeElement('//li[@class="ant-pagination-item ant-pagination-item-2 ant-pagination-item-active"]')
});

Scenario("Verify the click prev to page of the pagination.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnNextPage);
  I.waitForElement(ApptInfoPage.btnNextPage, 3)
  I.click(ApptInfoPage.btnNextPage)
  I.waitForElement(ApptInfoPage.btnPrevPage, 3)
  I.click(ApptInfoPage.btnPrevPage)
  I.seeElement('//li[@class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"]')
});

Scenario("Verify the click next to page of the pagination.", async({ I }) => {
  ApptInfoPage.assertApptInfoPageIsVisible();
  I.scrollTo(ApptInfoPage.btnNextPage);
  I.waitForElement(ApptInfoPage.btnNextPage, 3)
  I.click(ApptInfoPage.btnNextPage)
  I.seeElement('//li[@class="ant-pagination-item ant-pagination-item-2 ant-pagination-item-active"]')
});

Scenario("Verify the clear text in the search patient field.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.doctorInfoComplete.searchType;
  const doctorName = apptInfo.testSuite.testCases.doctorInfoComplete.input.doctorName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, doctorName);
  I.waitForElement(ApptInfoPage.btnClearText, 3);
  I.click(ApptInfoPage.btnClearText);
  I.pressKey('Enter');
  ApptInfoPage.assertApptInfoPageIsVisible();
});

Scenario("Verify the clear text in the search doctor field.", async({ I }) => {
  const searchType = apptInfo.testSuite.testCases.patientInfoComplete.searchType;
  const patientName = apptInfo.testSuite.testCases.patientInfoComplete.input.patientName;
  ApptInfoPage.assertApptInfoPageIsVisible();
  ApptInfoPage.isSearchResult(searchType, patientName);
  I.waitForElement(ApptInfoPage.btnClearText, 3);
  I.click(ApptInfoPage.btnClearText);
  I.pressKey('Enter');
  ApptInfoPage.assertApptInfoPageIsVisible();
});

Scenario("Verify the click the collapse option.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3);
  I.click(ApptInfoPage.btnMoreOption);
  I.waitForElement(ApptInfoPage.btnCollapseOption);
  I.click(ApptInfoPage.btnCollapseOption);
  I.seeElement(ApptInfoPage.btnMoreOption);
});

Scenario("Verify the click the more option.", async({ I }) => {
  I.waitForElement(ApptInfoPage.btnMoreOption, 3);
  I.click(ApptInfoPage.btnMoreOption);
  I.seeElement(ApptInfoPage.btnCollapseOption);
});
