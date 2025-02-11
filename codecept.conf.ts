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
  tests: 'tests/**/*.test.ts',
  plugins: {
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      resultsDir: "./allure-results",
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
      retries: 2,
    }
  },
  output: './output',
  mocha: {
    reporterOptions: {
        mochaFile: "output/result.xml"
    }
  },
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: process.env.BASE_URL,
      show: false,
      restart: false,
      keepBrowserState: true,
      keepCookies: true,
      waitForTimeout: 100000,
    }
  },
  include: {
    I: './steps_file',
    loginPage: "./pages/loginPage.ts",
    apptInfoPagePage: "./pages/apptInfoPage.ts",

    examplePagePage: "./pages/examplePage.ts",
  },
  name: 'tsc-backoffice-automation'
}