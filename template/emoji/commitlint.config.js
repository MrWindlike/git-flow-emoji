module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        ":sparkles:",
        ":bug:",
        ":lipstick:",
        ":construction:",
        ":package:",
        ":test_tube:",
        ":zap:",
        ":memo:",
        ":bookmark:",
        ":hammer:",
        ":rocket:",
        ":tada:",
      ],
    ],
    "subject-case": [0, "never"],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ["type", "scope", "subject", "ticket"],
    },
  },
};
