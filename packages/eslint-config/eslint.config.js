import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";

// TODO: Clean and organize this file
export default [
  { files: ["**/*.{ts,js}"] },
  { languageOptions: { globals: globals.node } },
  { plugins: { "@stylistic/js": stylisticJs, "@stylistic/ts": stylisticTs } },
  { rules: { "@stylistic/ts/semi": ["error", "always"], "@stylistic/js/semi": ["error", "always"], "@stylistic/js/quotes": ["error", "double"] } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
];
