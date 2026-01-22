import base from '@oakoss/eslint-config/react';
import storybook from 'eslint-plugin-storybook';

export default [
  { ignores: ['.storybook/'] },
  ...base,
  ...storybook.configs['flat/recommended'],
];
