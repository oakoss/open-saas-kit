import { RACProvider } from './rac-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <RACProvider>{children}</RACProvider>;
}
