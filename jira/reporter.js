const { event } = require("codeceptjs");
const { createTask, createSubTask } = require("./service");

const featureCache = {};

const JIRA_MODE = process.env.JIRA_MODE || "dry";

function initJiraReporter() {
  if (JIRA_MODE !== "jira") {
    console.log("🟡 Jira reporter disabled (dry-run mode)");
    return;
  }

  event.dispatcher.on(event.test.failed, async (test, err) => {
    const feature = test.suite?.title || "Unknown";
    const scenario = test.title;

    const featureName = feature.charAt(0).toUpperCase() + feature.slice(1);

    console.log(`🔥 FAIL: ${featureName} -> ${scenario}`);

    try {
      if (!featureCache[feature]) {
        const taskKey = await createTask(
          `[UI Automation] ${featureName}`,
          featureName,
        );
        featureCache[feature] = taskKey;
        console.log(`📌 TASK CREATED: ${taskKey}`);
      }

      const parentKey = featureCache[feature];

      const subtaskKey = await createSubTask(
        parentKey,
        `[BUG] ${scenario}`,
        err,
        test,
        feature,
      );

      console.log(`🧩 SUBTASK CREATED: ${subtaskKey}`);
    } catch (e) {
      console.log("❌ Jira error:", e.response?.data || e.message);
    }
  });
}

module.exports = { initJiraReporter };
