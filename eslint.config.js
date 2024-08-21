import eslint from "@eslint/js";
import url from "node:url";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import eslintPluginReact from "@eslint-react/eslint-plugin";
import simpleImport from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tailwindcss from "eslint-plugin-tailwindcss";
import { fixupPluginRules } from "@eslint/compat";
import reactPlugin from "@eslint-react/eslint-plugin";
import stylisticPlugin from "@stylistic/eslint-plugin";
import { fixupConfigRules } from "@eslint/compat";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default tseslint.config(
  {
    ignores: [
      "eslint.config.mjs",
      "eslint.config.js",
      "node_modules",
      "build/",
      "worker-configuration.d.ts",
      "load-context.ts",
    ],
  },
  {
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
      ["import"]: fixupPluginRules(importPlugin),
      ["react"]: eslintPluginReact,
      ["simple-import-sort"]: simpleImport,
      ["@stylistic"]: stylisticPlugin,
      ["tailwindcss"]: tailwindcss,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwindcss.configs["flat/recommended"],

  {
    rules: {
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/space-before-function-paren": ["error", "never"],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        cacheLifetime: {
          // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
          // in the rare case that we do - just need to manually restart their IDE.
          glob: "Infinity",
        },
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      "import/consistent-type-specifier-style": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-absolute-path": "error",
      "import/no-amd": "error",
      "import/no-default-export": "error",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      "import/no-named-default": "error",
      "import/no-named-export": "off",
      "import/no-self-import": "error",
      "import/prefer-default-export": "off",
      "simple-import-sort/imports": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...reactPlugin.configs.recommended,
  }
);
