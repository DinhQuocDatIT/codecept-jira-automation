const client = require("./client");
const { PROJECT_KEY } = require("./config");

// =====================
// TASK
// =====================
async function createTask(summary, feature) {
  const res = await client.post("/issue", {
    fields: {
      project: {
        key: PROJECT_KEY,
      },

      summary,

      issuetype: {
        name: "Task",
      },

      // Label vẫn giữ
      labels: ["ui-automation", feature.toLowerCase().replace(/\s+/g, "-")],

      // Thêm Component
      components: [
        {
          name: feature.toUpperCase(),
        },
      ],

      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: `Feature: ${feature}`,
              },
            ],
          },
        ],
      },
    },
  });

  return res.data.key;
}

// =====================
// SUBTASK DESCRIPTION
// =====================
function buildDescription(err, test) {
  const feature =
    test?.file?.split("\\").pop()?.replace("_test.js", "") || "Unknown";

  const fileName = test?.file?.split("\\").pop() || "N/A";
  return {
    type: "doc",
    version: 1,
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Tính năng: ${feature}`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Kịch bản kiểm thử: ${test?.title || "N/A"}`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `File kiểm thử: ${fileName}`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Error Message: ${err?.message || "Unknown Error"}`,
          },
        ],
      },
    ],
  };
}

// =====================
// SUBTASK
// =====================
async function createSubTask(parentKey, summary, err, test, feature) {
  const res = await client.post("/issue", {
    fields: {
      project: {
        key: PROJECT_KEY,
      },

      issuetype: {
        name: "Subtask",
      },

      parent: {
        key: parentKey,
      },

      summary,

      labels: ["ui-automation", feature.toLowerCase().replace(/\s+/g, "-")],

      // Thêm Component
      components: [
        {
          name: feature.toUpperCase(),
        },
      ],

      description: buildDescription(err, test),
    },
  });

  return res.data.key;
}

module.exports = {
  createTask,
  createSubTask,
  buildDescription,
};
