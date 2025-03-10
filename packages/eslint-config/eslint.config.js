import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

import stylisticJs from "@stylistic/eslint-plugin-js";
export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.node } },
  { plugins: { "@stylistic/js": stylisticJs } },
  { rules: { semi: "error", "@stylistic/js/quotes": ["error", "double"] } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
];
