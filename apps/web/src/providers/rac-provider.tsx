import { useRouter } from '@tanstack/react-router';
import {
  I18nProvider,
  RouterProvider as RACRouterProvider,
} from 'react-aria-components';

export function RACProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <I18nProvider locale="en-US">
      <RACRouterProvider
        navigate={(href, opts) => router.navigate({ ...href, ...opts })}
        useHref={(href) => router.buildLocation(href).href}
      >
        {children}
      </RACRouterProvider>
    </I18nProvider>
  );
}
