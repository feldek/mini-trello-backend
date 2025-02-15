import { baseCommonRules } from "./BaseRules.js";

const createCommonConfig = () => ({
  files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.mjs", "**/*.cjs"],
  languageOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
    globals: {
      window: "readonly",
      document: "readonly",
      navigator: "readonly",
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"],
      },
    },
  },
  rules: baseCommonRules,
});

export { createCommonConfig };
