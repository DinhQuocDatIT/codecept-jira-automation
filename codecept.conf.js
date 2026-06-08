require("dotenv").config();

const { setHeadlessWhen } = require("@codeceptjs/configure");
const { initJiraReporter } = require("./jira/reporter");

setHeadlessWhen(process.env.HEADLESS);

// chỉ init reporter nếu mode = jira
if (process.env.JIRA_MODE === "jira") {
  initJiraReporter();
}

exports.config = {
  tests: process.env.TEST_FILE || "./tests/*_test.js",
  output: "./output",

  helpers: {
    Playwright: {
      browser: "chromium",
      url: "http://localhost",
      show: true,
    },
  },

  include: {
    I: "./steps_file.js",
  },

  noGlobals: true,
};
