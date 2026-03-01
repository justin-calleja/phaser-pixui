import eslint from "@eslint/js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig(
  {
    ignores: ["dist", "example/dist", "node_modules"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        Phaser: "readonly",
      },
    },
  }
)
