//  @ts-check

import pluginReact from '@eslint-react/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import { defineConfig } from 'eslint/config';
import configPrettier from 'eslint-config-prettier';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
// @ts-ignore -- types are missing
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
// @ts-ignore -- types are incompatible with ESLint Plugin interface
import reactHooks from 'eslint-plugin-react-hooks';

import baseConfig from './base.js';

export default defineConfig(
  // Extend base config (without the trailing prettier config)
  ...baseConfig.slice(0, -1),

  // TanStack plugins
  ...pluginRouter.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],

  // React config
  {
    extends: [
      pluginReact.configs['recommended-type-checked'],
      reactHooks.configs.flat.recommended,
    ],
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      react,
      // @ts-ignore -- types are incompatible with ESLint Plugin interface
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-nested-component-definitions': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-no-constructed-context-values': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      'react/no-danger': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      'jsx-a11y': {
        components: {
          Button: 'button',
          Input: 'input',
          Select: 'select',
        },
      },
      react: { version: 'detect' },
    },
  },

  // Tailwind config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-consistent-important-position': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'off',
      'better-tailwindcss/enforce-shorthand-classes': 'warn',
      'better-tailwindcss/no-contradicting-classes': 'off',
      'better-tailwindcss/no-deprecated-classes': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'warn',
      'better-tailwindcss/no-unregistered-classes': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/app.css',
      },
    },
  },

  // Prettier must be last
  configPrettier,
);
