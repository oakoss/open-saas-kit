import { defineConfig } from 'cz-git';

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Relax line length limits for detailed commits
    'header-max-length': [2, 'always', 200],
    'body-max-line-length': [0, 'always'],
  },
  prompt: {
    scopes: [
      // Apps
      'web',
      // Packages
      'auth',
      'config',
      'database',
      'ui',
      'eslint-config',
      'typescript-config',
      // Cross-cutting
      'deps',
      'ci',
    ],
    allowCustomScopes: true,
    allowEmptyScopes: true,
  },
});
