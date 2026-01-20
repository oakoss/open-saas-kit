# Agent Instructions

This file provides guidance to AI agents when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start all packages in dev mode
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm check-types      # Type check all packages

# Database (runs in @oakoss/database package)
pnpm db:push          # Push schema to database (dev workflow)
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations (production workflow)

# Start PostgreSQL
docker-compose up -d
```

## Architecture

### Monorepo Structure (Turborepo + pnpm)

**Apps:**

- `apps/web` - TanStack Start application (SSR React framework)

**Packages:**

- `@oakoss/auth` - Better Auth configuration with server/client split
- `@oakoss/database` - Drizzle ORM schemas and PostgreSQL client
- `@oakoss/config` - Zod-validated environment variables
- `@oakoss/ui` - React Aria Components with Tailwind styling
- `@oakoss/eslint-config` - Shared ESLint configurations
- `@oakoss/typescript-config` - Shared TypeScript configurations

### Authentication Flow

Server (`@oakoss/auth/server`):

- Better Auth instance with Drizzle adapter
- Handles OAuth providers (GitHub, Google) and email/password
- Exports `auth` for API route handlers

Client (`@oakoss/auth/client`):

- React hooks: `useSession`, `signIn`, `signOut`, `signUp`
- `getSession()` for server-side session checks

API endpoint at `/api/auth/$` catches all auth requests.

### Routing (TanStack Start)

- File-based routing in `apps/web/src/routes/`
- `__root.tsx` - Root layout with nav
- `_authed.tsx` - Protected route layout (redirects to login if no session)
- Routes under `_authed/` require authentication

### UI Components

Built on React Aria Components with:

- Variant/size props pattern
- `cn()` utility for class merging (clsx + tailwind-merge)
- Tailwind CSS v4 for styling

### Database Schema

Schema files in `packages/database/src/schema/`:

- Better Auth tables: `users`, `sessions`, `accounts`, `verifications`
- Use `$inferSelect` / `$inferInsert` for types

## Key Patterns

- Import workspace packages: `import { db } from "@oakoss/database"`
- Environment validation: `import { env } from "@oakoss/config"`
- Protected routes: Place under `_authed/` directory
- UI components: Extend React Aria components with variant props

## Beads workflow

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

### Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:

   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```

5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
