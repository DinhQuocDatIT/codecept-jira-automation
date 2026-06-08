const { createTask } = require("./jira/service");

(async () => {
  const key = await createTask("TEST FROM CODECEPT");
  console.log("Created:", key);
})();