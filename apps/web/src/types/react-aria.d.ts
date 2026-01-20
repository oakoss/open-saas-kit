import { type NavigateOptions, type ToOptions } from '@tanstack/react-router';

declare module 'react-aria-components' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- Module augmentation requires interface
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}
