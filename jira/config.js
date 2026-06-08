require("dotenv").config();

module.exports = {
  JIRA_BASE: process.env.JIRA_BASE,
  EMAIL: process.env.EMAIL,
  TOKEN: process.env.TOKEN,
  PROJECT_KEY: process.env.PROJECT_KEY,
};
