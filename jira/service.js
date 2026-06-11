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

      labels: ["ui-automation", feature.toLowerCase().replace(/\s+/g, "-")],

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
// SAFE ERROR
// =====================
function getErrorMessage(err) {
  try {
    if (typeof err?.message === "string") {
      return err.message;
    }

    if (typeof err === "string") {
      return err;
    }

    return JSON.stringify(err, null, 2);
  } catch {
    return "Không xác định";
  }
}

// =====================
// SUBTASK DESCRIPTION
// =====================
function buildDescription(err, test) {
  const feature =
    test?.file?.split("\\").pop()?.replace("_test.js", "") || "Unknown";

  const fileName = test?.file?.split("\\").pop() || "N/A";

  const expectedResult = err?.expected || "Không xác định";

  let actualResult = "Không xác định";

  // Assertion fail (I.see, I.dontSee, ...)
  if (err?.expected && err?.actual) {
    actualResult = `Không tìm thấy nội dung mong đợi trên giao diện: "${err.expected}"`;
  }
  // Các lỗi khác
  else if (err?.message) {
    actualResult = err.message;
  }
  // Fallback cuối cùng
  else {
    actualResult = String(err);
  }

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
            text: "Trạng thái: FAIL",
          },
        ],
      },

      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Kết quả mong đợi: ${expectedResult}`,
          },
        ],
      },

      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Kết quả thực tế: ${actualResult}`,
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

      // components: [
      //   {
      //     name: feature.toUpperCase(),
      //   },
      // ],

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
