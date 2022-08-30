module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "plugin:vue/essential", "@vue/airbnb", "@vue/prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vuejs-accessibility/click-events-have-key-events": "off",
    "vue/multi-word-component-names": "off",
    "import/prefer-default-export": "off",
    "no-promise-executor-return": "off",
    "no-unused-expressions": "off",
    "consistent-return": "off",
    "no-return-assign": "off",
    "func-names": "off",
    "no-void": "off",
    "no-shadow": ["error", { allow: ["state", "resolve", "reject", "done", "cb"] }],
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["e", "el", "state", "result", "config", "Vue"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
