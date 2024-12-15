import {
  setHeadlessWhen,
  setCommonPlugins
} from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);
require('dotenv').config({
  path: `./env/.env.${process.env.NODE_ENV}`
});

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './**/*.ts',
  plugins: {
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      resultsDir: "./allure-results",
      disableWebdriverStepsReporting: false, // ปิดการนับผลลัพธ์ซ้ำ
      disableWebdriverScreenshotsReporting: false
    },
  },
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: process.env.BASE_URL,
      show: true,
      restart: false
    }
  },
  include: {
    I: './steps_file',
    loginPage: "./pages/loginPage.ts",
    apptInfoPagePage: "./pages/apptInfoPage.ts",
  },
  name: 'tsc-backoffice-automation'
}