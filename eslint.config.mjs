import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      "simple-import-sort": simpleImportSort,
    },
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "next",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ),
    ),
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "prettier/prettier": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  globalIgnores([
    "node_modules/**/*",
    "dist/**/*",
    "out/**/*",
    "public/**/*",
    ".next/**/*",
    "prisma/**/*",
  ]),
]);
