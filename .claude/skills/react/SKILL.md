---
name: react
description: React hooks + performance patterns. Use for useEffect, useMemo, useCallback, memo, rerender, derived state, performance, bundle, optimize, hooks, state, useTransition, Promise.all, waterfall, async
---

# React Fundamentals

## Quick Decision Framework

| Question                               | Solution                                    | Reference                                    |
| -------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| Should I use useEffect?                | Probably not - see decision tree            | [hooks.md](hooks.md)                         |
| How do I compute values from props?    | Calculate during render                     | [alternatives.md](alternatives.md)           |
| When should I useMemo/useCallback?     | Only for expensive ops or memoized children | [performance.md](performance.md)             |
| Is my component re-rendering too much? | Check prop stability, state colocation      | [performance.md](performance.md)             |
| Multiple awaits in sequence?           | Use Promise.all for independent fetches     | [advanced-patterns.md](advanced-patterns.md) |
| State update blocks the UI?            | Use useTransition for non-urgent updates    | [advanced-patterns.md](advanced-patterns.md) |

## Core Philosophy

**Effects are escape hatches.** They synchronize React with external systems. If no external system is involved, you likely don't need one.

**Performance optimization is targeted.** Don't memoize everything. Profile first, optimize measurable bottlenecks.

## Topics

### Hooks

- [Hooks Best Practices](hooks.md) - Effect philosophy, decision framework
- [Anti-Patterns](anti-patterns.md) - Common useEffect mistakes with fixes
- [Alternatives to useEffect](alternatives.md) - What to use instead

### Performance

- [Performance Optimization](performance.md) - Memoization, re-renders, bundle size
- [Performance Reference](performance-reference.md) - DevTools, profiling, virtualization

### Advanced

- [Advanced Patterns](advanced-patterns.md) - Async waterfalls, useTransition, Set/Map lookups

## Common Mistakes

| Mistake                    | Fix                                 | Reference                                    |
| -------------------------- | ----------------------------------- | -------------------------------------------- |
| Derived state in useEffect | Calculate during render             | [anti-patterns.md](anti-patterns.md)         |
| Effect chains (A→B→C)      | Derive all values directly          | [anti-patterns.md](anti-patterns.md)         |
| useMemo for simple values  | Only memoize expensive computations | [performance.md](performance.md)             |
| useCallback everywhere     | Only for memoized child components  | [performance.md](performance.md)             |
| Object literals as props   | Define outside component or useMemo | [performance.md](performance.md)             |
| Manual data fetching       | Use TanStack Query                  | [alternatives.md](alternatives.md)           |
| Sequential awaits          | Use Promise.all for parallel ops    | [advanced-patterns.md](advanced-patterns.md) |
| Array.includes in loops    | Use Set with useMemo for O(1)       | [advanced-patterns.md](advanced-patterns.md) |
| useState(expensiveInit())  | Use useState(() => expensiveInit()) | [advanced-patterns.md](advanced-patterns.md) |

## Delegation

| Task                      | Delegate To                                                |
| ------------------------- | ---------------------------------------------------------- |
| Data fetching & caching   | [tanstack-query](../tanstack-query/SKILL.md) skill         |
| Form state                | [tanstack-form](../tanstack-form/SKILL.md) skill           |
| URL state                 | [tanstack-router](../tanstack-router/SKILL.md) skill       |
| Component design patterns | [component-patterns](../component-patterns/SKILL.md) skill |
| Code review               | `code-reviewer` agent                                      |
