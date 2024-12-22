const { I } = inject();

export class apptInfoPagePage {
  headerTitle: string;
  searchTitle: string;
  doctorInput: string;
  patientInput: string;
  apptSelect: string;
  consultSelect: string;
  consultTypeSelect: string;
  apptDatePicker: string;
  exportBtn: string;
  apptInfoTable: string;
  notFoundMsg: string;
  moreOptionsBtn: string;
  collapseOptionsBtn: string;
  resetBtn: string;
  exportModal: string;
  cancelModalBtn: string;
  closeModalBtn: string;
  rowsPerPageBtn: string;
  rowsPerPageOpt: string;
  dataTable: string;
  prevPageBtn: string;
  nextPageBtn: string;
  clearTextBtn: string;
  searchPageRows: string;
  apptStart: string;
  apptEnd: string;

  constructor() {
    //insert your locators
    this.headerTitle = '//span[@class="ant-page-header-heading-title"]//*[normalize-space(text())="Appointment Info"]';
    this.searchTitle = '//h4[@class="ant-typography css-1ulwx50" and normalize-space(text())="Advanced Search"]';
    this.doctorInput = '//input[@placeholder="Search a Doctor" and @type="search"]';
    this.patientInput = '//input[@placeholder="Search a Patient" and @type="search"]';
    this.apptSelect = '//div/div/label[text()="Appointment Status"]/../..//span[@title="Show All"]';
    this.consultSelect = '//div/div/label[text()="Consultation Status"]/../..//span[@title="Show All"]';
    this.collapseOptionsBtn = '//button[@type="button"]/span[text()="Collapse Option"]'
    this.apptInfoTable = '//div[@class="ant-table-content"]';
    this.notFoundMsg = '//h4[@class="ant-typography css-98ntnt"]';
    this.moreOptionsBtn = '//button[@type="button"]/span[text()="More Option"]';
    this.resetBtn = '//button[@type="button"]/span[text()="Reset to Default"]';
    this.exportBtn = '//button[@type="button"]/span[text()="Export File"]';
    this.exportModal = '//div[@class="ant-modal-body"]';
    this.cancelModalBtn = '//button[@type="button"]/span[text()="Cancel"]';
    this.closeModalBtn = '//button[@type="button" and @class="ant-modal-close"]';
    this.rowsPerPageBtn = '//li[@class="ant-pagination-options"]'
    this.rowsPerPageOpt= '//div[@class="rc-virtual-list-holder-inner"]';
    this.dataTable = '//tbody//tr[@class="ant-table-row ant-table-row-level-0"]';
    this.prevPageBtn = '//button[@class="ant-pagination-item-link"]/span[@class="anticon anticon-left"]';
    this.nextPageBtn = '//button[@class="ant-pagination-item-link"]/span[@class="anticon anticon-right"]';
    this.clearTextBtn = '//span[@class="anticon anticon-close-circle"]';
    this.searchPageRows = '//li[@class="ant-pagination-options"]//input[@class="ant-select-selection-search-input"]'
    this.apptStart = '//input[@id="appointmentAt"]'
    this.apptEnd = '//div//input[@placeholder="Latest"]'
  }
  // insert your methods here
  async assertApptInfoPageIsVisible() {
    I.waitForElement(this.headerTitle);
    I.waitForElement(this.searchTitle);
    I.waitForElement(this.doctorInput);
    I.waitForElement(this.patientInput);
    I.waitForElement(this.apptSelect);
  }

  async onMenuClick(menuItem: string) {
    const menuLocator = `//*[normalize-space(text())="${menuItem}"]`;
    I.waitForElement(menuLocator, 30);
    I.click(menuLocator);
  }

  async isSearchResult(searchType: "Doctor" | "Patient", name: string) {
    const inputField = searchType === "Doctor" ? this.doctorInput : this.patientInput;
    I.fillField(inputField, name);
    I.pressKey("Enter");
  }

  async assertResultNotFound() {
    I.wait(3)
    I.see(
      "Sorry, it seems we haven't found what you need.",
      this.notFoundMsg
    );
  }

  async assertApptDetailsVisible(fieldName: string, assertData: string, rowCount: any) {
    let fieldIndex: number;
    const headers = await I.grabTextFromAll("//thead//tr//th");
    fieldIndex = headers.indexOf(fieldName) + 1;

    for (let i = 1; i <= rowCount; i++) {
      const cellLocator = `${this.dataTable}[${i}]/td[${fieldIndex}]`;
      I.waitForElement(cellLocator);
      I.see(assertData, cellLocator);
    }
  }

  async getRowCount(){
    I.waitForElement(this.dataTable);
    const rowCount = await I.grabNumberOfVisibleElements(this.dataTable);
    return rowCount;
  }

  async assertRowsPerPageVisible(rowCountPage: number){
    const rowsPerPageLocator = `${this.rowsPerPageOpt}/div[@role="option" and @title="${rowCountPage} / page"]`;
    I.waitForElement(rowsPerPageLocator);
    I.click(rowsPerPageLocator);
    I.wait(3);
    I.waitNumberOfVisibleElements(this.dataTable, rowCountPage);
  }
}

// For inheritance
export default new apptInfoPagePage();
