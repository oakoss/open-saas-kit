import { tailwindPlugin } from '@bosh-code/tsdown-plugin-tailwindcss';
import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  entry: ['./src/index.ts', './src/styles/theme.css'],
  exclude: ['**/*.stories.tsx', '**/*.stories.ts', '.storybook/**'],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    // Peer dependencies that consumers will provide
    'react-aria-components',
    'recharts',
    'sonner',
    'vaul',
    'next-themes',
  ],
  format: ['esm'],
  minify: process.env.NODE_ENV === 'production',
  outDir: 'dist',
  platform: 'browser',
  plugins: [tailwindPlugin()],
  sourcemap: true,
});
