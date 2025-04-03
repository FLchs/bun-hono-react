import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import config from "@cm3k/eslint-config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import unusedImports from "eslint-plugin-unused-imports";
// import tailwind from "eslint-plugin-tailwindcss";

export default tseslint.config(
  ...config,
  { ignores: ["dist", "**/routeTree.gen.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "unicorn/filename-case": [
        "off",
        {
          case: "kebabCase",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unicorn/prevent-abbreviations": "off", // makes everything soooooo literal
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // ...tailwind.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
);
