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
        navigate={(href) => router.navigate({ to: href as string })}
        useHref={(href) => router.buildLocation({ to: href as string }).href}
      >
        {children}
      </RACRouterProvider>
    </I18nProvider>
  );
}
