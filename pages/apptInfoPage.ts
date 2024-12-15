const { I } = inject();

export class apptInfoPagePage {
  headderTitle: string;
  titleSearch: string;
  doctorInput: string;
  patientInput: string;
  appointmentSelect: string;
  conSultSelect: string;
  consultationSelect: string;
  appointmentDate: string;
  btnExportFile: string;
  tableApptInfo: string;
  messageNotFound: string;
  btnMoreOption: string;
  btnCollapseOption: string;
  btnReset: string;
  modalExport: string;
  btnModalCancel: string;
  btnModalClose: string;
  btnRowPage: string;
  optionRowPage: string;
  dataTable: string;
  btnPrevPage: string;
  btnNextPage: string;
  btnClearText: string;
  searchRowPage: string;
  appointmentAt: string;
  appointmentEnd: string;

  constructor() {
    //insert your locators
    this.headderTitle = '//span[@class="ant-page-header-heading-title"]//*[normalize-space(text())="Appointment Info"]';
    this.titleSearch = '//h4[@class="ant-typography css-1ulwx50" and normalize-space(text())="Advanced Search"]';
    this.doctorInput = '//input[@placeholder="Search a Doctor" and @type="search"]';
    this.patientInput = '//input[@placeholder="Search a Patient" and @type="search"]';
    this.appointmentSelect = '//div/div/label[text()="Appointment Status"]/../..//span[@title="Show All"]';
    this.conSultSelect = '//div/div/label[text()="Consultation Status"]/../..//span[@title="Show All"]';
    this.btnCollapseOption = '//button[@type="button"]/span[text()="Collapse Option"]'
    this.tableApptInfo = '//div[@class="ant-table-content"]';
    this.messageNotFound = '//h4[@class="ant-typography css-98ntnt"]';
    this.btnMoreOption = '//button[@type="button"]/span[text()="More Option"]'; 
    this.btnReset = '//button[@type="button"]/span[text()="Reset to Default"]';
    this.btnExportFile = '//button[@type="button"]/span[text()="Export File"]';
    this.modalExport = '//div[@class="ant-modal-body"]';
    this.btnModalCancel = '//button[@type="button"]/span[text()="Cancel"]';
    this.btnModalClose = '//button[@type="button" and @class="ant-modal-close"]';
    this.btnRowPage = '//li[@class="ant-pagination-options"]'
    this.optionRowPage= '//div[@class="rc-virtual-list-holder-inner"]';
    this.dataTable = '//tbody//tr[@class="ant-table-row ant-table-row-level-0"]';
    this.btnPrevPage = '//button[@class="ant-pagination-item-link"]/span[@class="anticon anticon-left"]';
    this.btnNextPage = '//button[@class="ant-pagination-item-link"]/span[@class="anticon anticon-right"]';
    this.btnClearText = '//span[@class="anticon anticon-close-circle"]';
    this.searchRowPage = '//li[@class="ant-pagination-options"]//input[@class="ant-select-selection-search-input"]'
    this.appointmentAt = '//div//input[@id="appointmentAt"]'
    this.appointmentEnd = '//div//input[@placeholder="Latest"]'
  }
  // insert your methods here
  async assertApptInfoPageIsVisible() {
    I.see("Appointment Info", this.headderTitle);
    I.see("Advanced Search", this.titleSearch);
    I.seeElement(this.doctorInput);
    I.seeElement(this.patientInput);
    I.seeElement(this.appointmentSelect);
  }

  async onMenuClick(menuItem: string) {
    // I.wait()
    I.waitForElement(`//*[normalize-space(text())="${menuItem}"]`, 30)
    I.click(`//*[normalize-space(text())="${menuItem}"]`);
  }

  async isSearchResult(searchType: string, name: string) {
    if (searchType === "Doctor") {
      I.fillField(this.doctorInput, name);
    } else {
      I.fillField(this.patientInput, name);
    }
    I.pressKey("Enter");
  }

  async assertResultNotFound() {
    I.wait(3)
    I.see(
      "Sorry, it seems we haven't found what you need.",
      this.messageNotFound
    );
  }

  async assertApptDetailsVisible(fieldName: string, assertData: string, rowCount: any) {
    let fieldIndex: number;
    const headers = await I.grabTextFromAll("//thead//tr//th");
    fieldIndex = headers.indexOf(fieldName) + 1;

    for (let i = 1; i <= rowCount; i++) {
      I.waitForElement(`${this.dataTable}[${i}]/td[${fieldIndex}]`, 3)
      I.see(assertData, `${this.dataTable}[${i}]/td[${fieldIndex}]`);
    }
  }

  async getRowCount(){
    I.waitForElement(`${this.dataTable}`, 3)
    let rowCount = await I.grabNumberOfVisibleElements(`${this.dataTable}`);
  }

  async assertRowsPerPageVisible(rowCountPage: number){
    I.waitForElement(`${this.optionRowPage}/div[@role="option" and @title="${rowCountPage} / page"]`, 3)
    I.click(`${this.optionRowPage}/div[@role="option" and @title="${rowCountPage} / page"]`)
    I.wait(3)
    I.waitNumberOfVisibleElements(`${this.dataTable}`, rowCountPage);
  }
}

// For inheritance
export default new apptInfoPagePage();
