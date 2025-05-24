import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import solid from "eslint-plugin-solid/configs/typescript";
import tsParser from "@typescript-eslint/parser";
import noOnlyTests from "eslint-plugin-no-only-tests";
import eslintComments from "eslint-plugin-eslint-comments";
import typescriptEslint from "@typescript-eslint/eslint-plugin";


export default defineConfig([
  { ignores: ["node_modules", "dist", "dev", "tsup.config.ts", "vitest.config.ts"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: ".",
      },
    },
  },
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "no-only-tests": noOnlyTests,
      "eslint-comments": eslintComments,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: ".",
      },
    },
    rules: {
        // Semicolons
        semi: ["error", "always"],
        "semi-spacing": ["error", {
            after: true,
            before: false,
        }],
        "semi-style": ["error", "last"],
        "no-extra-semi": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",

        // Other rules
        "@typescript-eslint/no-inferrable-types": ["error", {
            ignoreParameters: true,
            ignoreProperties: true,
        }],

        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-expressions": ["error", {
            allowShortCircuit: true,
            allowTernary: true,
        }],

        // Paied with tsconfig.json's verbatimModuleSyntax
        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports',
            fixStyle: 'separate-type-imports',
            disallowTypeAnnotations: false,
        }],

        // From https://github.com/obsidianmd/obsidian-sample-plugin/blob/master/.eslintrc
        "@typescript-eslint/ban-ts-comment": "off",
        "no-prototype-builtins": "off",
        "@typescript-eslint/no-empty-function": "off",

        // From https://github.com/solidjs-community/solid-lib-starter/blob/main/.eslintrc
        "prefer-const": "warn",
        "no-console": "warn",
        "no-debugger": "warn",
        
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_"
            }
        ],
        
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unnecessary-condition": "warn",
        "@typescript-eslint/no-useless-empty-export": "warn",
        "no-only-tests/no-only-tests": "warn",
        "eslint-comments/no-unused-disable": "warn"
    }
  }
]);
