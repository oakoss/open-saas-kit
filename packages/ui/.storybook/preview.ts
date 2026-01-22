import type { Preview } from '@storybook/react-vite';

import { themes } from 'storybook/theming';

import '../src/styles/theme.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      disable: true,
    },
  },
};

export default preview;
