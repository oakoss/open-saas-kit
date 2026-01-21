'use client';

import { Badge, cn, Separator } from '@oakoss/ui';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_demo')({
  beforeLoad: () => {
    if (import.meta.env.PROD) {
      throw redirect({ to: '/' });
    }
  },
  component: DemoLayout,
});

const demoPages = [
  { href: '/dev/components', label: 'Components' },
  { href: '/dev/forms', label: 'Forms' },
  { href: '/dev/tables', label: 'Tables' },
];

function DemoLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="bg-muted/40 w-64 border-r p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">UI Demos</h2>
          <Badge className="mt-1" variant="secondary">
            Dev Only
          </Badge>
        </div>
        <Separator className="mb-4" />
        <nav className="space-y-1">
          {demoPages.map((page) => (
            <Link
              key={page.href}
              className={cn(
                'hover:bg-muted block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                location.pathname === page.href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground',
              )}
              to={page.href}
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
