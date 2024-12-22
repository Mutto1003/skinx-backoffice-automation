/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type loginPage = typeof import('./pages/loginPage');
type apptInfoPage = typeof import('./pages/apptInfoPage');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage, apptInfoPagePage: apptInfoPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
