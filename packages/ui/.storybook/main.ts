import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Resolves the absolute path of a package in monorepo environments.
 * Required for pnpm workspaces and Yarn PnP.
 */
const getAbsolutePath = (packageName: string) =>
  dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    // Use react-docgen for better monorepo support (react-docgen-typescript has issues)
    reactDocgen: 'react-docgen',
    check: false,
  },
};

export default config;
