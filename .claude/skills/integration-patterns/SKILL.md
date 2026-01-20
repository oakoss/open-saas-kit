---
name: integration-patterns
description: Complete flow examples combining TanStack Form, Query, Router, and Start. Use when implementing end-to-end features that span multiple systems.
---

# Integration Patterns

Quick reference for common full-stack flows. Each flow has a dedicated file with complete copy-paste examples.

## Flow Overview

| Flow                                             | Components                      | Use Case                      |
| ------------------------------------------------ | ------------------------------- | ----------------------------- |
| [Form → Server → Query](#form--server--query)    | Form, Server Function, Query    | Create/update resources       |
| [Infinite List](#infinite-list)                  | Infinite Query, Server Function | Paginated feeds, timelines    |
| [Paginated Table](#paginated-table)              | Table, Query, Router Search     | Admin dashboards, data grids  |
| [Auth → Protected Route](#auth--protected-route) | Auth Client, Middleware, Router | Login, session, guards        |
| [Error Handling](#error-handling)                | Error Boundaries, Toast         | Error recovery, user feedback |

---

## Form → Server → Query

Creates a resource with validation, server mutation, and cache invalidation.

**Key pieces:**

```tsx
import { createServerFn } from '@tanstack/react-start';
import { db } from '@oakoss/database';
import { auth } from '@oakoss/auth/server';

// 1. Server function with auth + validation
export const createPost = createServerFn({ method: 'POST' })
  .inputValidator(createPostSchema)
  .handler(async ({ data, request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return { error: 'Unauthorized', code: 'AUTH_REQUIRED' };
    // ... insert and return
  });

// 2. Form with mutation
const mutation = useMutation({
  mutationFn: (values) => createPost({ data: values }),
  onSuccess: (result) => {
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Created!');
    }
  },
});

// 3. Handle server errors in form
if (result.error) {
  form.setErrorMap({ onServer: result.error });
}
```

---

## Infinite List

Cursor-based pagination with intersection observer auto-loading.

**Key pieces:**

```tsx
import { createServerFn } from '@tanstack/react-start';
import { db, lt } from '@oakoss/database';
import { posts } from '@oakoss/database/schema';

// 1. Server function returns { items, nextCursor }
export const getPostsInfinite = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({ cursor: z.string().optional(), limit: z.number() }),
  )
  .handler(async ({ data }) => {
    const items = await db.query.posts.findMany({
      where: data.cursor
        ? lt(posts.createdAt, new Date(data.cursor))
        : undefined,
      limit: data.limit + 1,
    });
    const hasMore = items.length > data.limit;
    return {
      items: hasMore ? items.slice(0, -1) : items,
      nextCursor: hasMore ? items.at(-1)?.createdAt.toISOString() : undefined,
    };
  });

// 2. Infinite query options
export function postsInfiniteOptions() {
  return {
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam }) =>
      getPostsInfinite({ data: { cursor: pageParam } }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  };
}

// 3. Auto-fetch on scroll
const { ref, inView } = useInView();
useEffect(() => {
  if (inView && hasNextPage) fetchNextPage();
}, [inView, hasNextPage]);
```

---

## Paginated Table

Server-side pagination with URL state synchronization.

**Key pieces:**

```tsx
import { zodValidator } from '@tanstack/zod-adapter';

// 1. Route validates search params
export const Route = createFileRoute('/_app/admin/users')({
  validateSearch: zodValidator(
    z.object({
      page: z.number().default(1),
      size: z.number().default(10),
      sort: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
    }),
  ),
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(usersQueryOptions(deps)),
});

// 2. Update URL on table state change
const handlePaginationChange = (pagination: PaginationState) => {
  navigate({
    search: (prev) => ({
      ...prev,
      page: pagination.pageIndex + 1,
      size: pagination.pageSize,
    }),
  });
};

// 3. Server function returns { items, meta: { total, totalPages } }
```

---

## Auth → Protected Route

Login flow with session and route protection.

**Key pieces:**

```tsx
import { authClient } from '@oakoss/auth/client';
import { auth } from '@oakoss/auth/server';
import { createMiddleware } from '@tanstack/react-start';

// 1. Login with Better Auth client
const result = await authClient.signIn.email({ email, password });
if (result.error) form.setErrorMap({ onServer: result.error.message });

// 2. Auth middleware
export const authMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) throw redirect({ to: '/login' });
    return next({ context: { session } });
  },
);

// 3. Protected layout applies middleware
export const Route = createFileRoute('/_app')({
  server: { middleware: [authMiddleware] },
  component: AppLayout,
});

// 4. Access session in components
const { session } = Route.useRouteContext();
```

---

## Error Handling

Structured errors with boundaries and recovery.

**Key pieces:**

```tsx
import { Button } from '@oakoss/ui';

// 1. Return structured errors from server
return { error: 'Not found', code: 'NOT_FOUND' };

// 2. Handle in mutation onSuccess
if ('error' in result) {
  switch (result.code) {
    case 'AUTH_REQUIRED':
      navigate({ to: '/login' });
      break;
    case 'VALIDATION_ERROR':
      form.setFieldMeta(...);
      break;
    default:
      toast.error(result.error);
  }
}

// 3. Route error boundaries
export const Route = createFileRoute('...')({
  errorComponent: ({ error, reset }) => (
    <div>
      <p>{error.message}</p>
      <Button onPress={reset}>Try Again</Button>
    </div>
  ),
  notFoundComponent: () => <NotFoundMessage />,
});
```

---

## Common Mistakes

| Mistake                                              | Correct Pattern                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| Not invalidating cache after mutation                | Use `queryClient.invalidateQueries({ queryKey })` in onSuccess  |
| Missing auth check in server function                | Always verify session from `request.headers`                    |
| Form not showing server errors                       | Use `form.setErrorMap({ onServer: error })`                     |
| Infinite query without proper cursor                 | Provide `initialPageParam` and `getNextPageParam`               |
| Not prefetching for SSR                              | Use `ensureQueryData` in route loaders                          |
| Table state not synced to URL                        | Use `validateSearch` + navigate on change                       |
| Handling error in onError instead of checking result | Server functions return errors in result, not thrown            |
| Not resetting page on filter change                  | Set `page: 1` when search/filter changes                        |
| Missing loading states                               | Show skeletons during `isPending`, overlays during `isFetching` |
| No error boundary on routes                          | Add `errorComponent` and `notFoundComponent`                    |

---

## Delegation

- **Pattern discovery**: For finding existing implementations, use `Explore` agent
- **Code review**: After implementing flows, delegate to `code-reviewer` agent
- **Security audit**: For auth flows, delegate to `security-auditor` agent

## Complete Flow Examples

- [Form → Server → Query](form-server-query.md) - Create/update with validation and cache
- [Infinite List](infinite-list.md) - Cursor pagination with auto-loading
- [Paginated Table](paginated-table.md) - Server pagination with URL state
- [Auth → Protected Route](auth-protected.md) - Login, session, and guards
- [Error Handling](error-handling.md) - Boundaries, toast, and recovery

## Related Skills

- TanStack Query patterns: [tanstack-query skill](../tanstack-query/SKILL.md)
- TanStack Form patterns: [tanstack-form skill](../tanstack-form/SKILL.md)
- Server functions: [server-functions skill](../server-functions/SKILL.md)
- Error handling: [error-boundaries skill](../error-boundaries/SKILL.md)
