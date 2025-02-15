import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import rulesdirPlugin from "eslint-plugin-rulesdir";
import path from "node:path";
import { baseTypescriptRules } from "./BaseRules.js";

const createTypescriptConfig = (tsConfigRootDir) => ({
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      project: tsConfigRootDir ? path.join(tsConfigRootDir, "tsconfig.json") : undefined,
      ecmaFeatures: {
        jsx: true,
      },
      tsconfigRootDir: tsConfigRootDir ? path.join(tsConfigRootDir, "tsconfig.json") : undefined,
    },
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin,
    rulesdir: rulesdirPlugin,
    "@stylistic/ts": stylisticTs,
  },
  rules: baseTypescriptRules,
});

export { createTypescriptConfig };
