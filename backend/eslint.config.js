import rulesdirPlugin from "eslint-plugin-rulesdir";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {createTypescriptConfig} from "./esLint/presets/typescript/CreateConfig.js";
import {createCommonConfig} from "./esLint/presets/common/CreateConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

rulesdirPlugin.RULES_DIR = path.resolve(__dirname, "esLint/rules");

export default [
  createCommonConfig(),

  createTypescriptConfig(__dirname),
];
