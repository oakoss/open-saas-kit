'use client';

import {
  Tab as TabPrimitive,
  TabList as TabListPrimitive,
  type TabListProps,
  TabPanel as TabPanelPrimitive,
  type TabPanelProps,
  type TabProps,
  Tabs as TabsPrimitive,
  type TabsProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../lib/utils';

export const tabsVariants = tv({
  base: 'gap-2 group/tabs flex orientation-horizontal:flex-col',
});

export const tabsListVariants = tv({
  base: [
    'rounded-lg p-0.75',
    'group-data-horizontal/tabs:h-8',
    'group/tabs-list text-muted-foreground',
    'inline-flex w-fit items-center justify-center',
    'group-orientation-vertical/tabs:h-fit',
    'group-orientation-vertical/tabs:flex-col',
  ],
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'bg-muted',
      line: 'gap-1 bg-transparent rounded-none',
    },
  },
});

export const tabsTriggerVariants = tv({
  base: [
    'relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center',
    'gap-1.5 rounded-md border border-transparent px-1.5 py-0.5',
    'text-sm font-medium whitespace-nowrap transition-all',
    'text-foreground/60 hover:text-foreground',
    'dark:text-muted-foreground dark:hover:text-foreground',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-ring focus-visible:outline-1',
    'disabled:pointer-events-none disabled:opacity-50',
    'group-orientation-vertical/tabs:w-full group-orientation-vertical/tabs:justify-start',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Selected state
    'selected:bg-background selected:text-foreground',
    'dark:selected:text-foreground dark:selected:border-input dark:selected:bg-input/30',
    'group-data-[variant=default]/tabs-list:selected:shadow-sm',
    // Line variant overrides
    'group-data-[variant=line]/tabs-list:bg-transparent',
    'group-data-[variant=line]/tabs-list:selected:bg-transparent',
    'group-data-[variant=line]/tabs-list:selected:shadow-none',
    'dark:group-data-[variant=line]/tabs-list:selected:border-transparent',
    'dark:group-data-[variant=line]/tabs-list:selected:bg-transparent',
    // Line indicator (after pseudo-element)
    'after:bg-foreground after:absolute after:opacity-0 after:transition-opacity',
    'group-orientation-horizontal/tabs:after:inset-x-0',
    'group-orientation-horizontal/tabs:after:-bottom-1.25',
    'group-orientation-horizontal/tabs:after:h-0.5',
    'group-orientation-vertical/tabs:after:inset-y-0',
    'group-orientation-vertical/tabs:after:-right-1',
    'group-orientation-vertical/tabs:after:w-0.5',
    'group-data-[variant=line]/tabs-list:selected:after:opacity-100',
  ],
});

function Tabs({ className, orientation = 'horizontal', ...props }: TabsProps) {
  return (
    <TabsPrimitive
      className={cx(tabsVariants(), className)}
      data-slot="tabs"
      orientation={orientation}
      {...props}
    />
  );
}

function TabsList<T extends object>({
  className,
  variant,
  ...props
}: TabListProps<T> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabListPrimitive
      className={cx(tabsListVariants({ variant }), className)}
      data-slot="tabs-list"
      data-variant={variant}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabProps) {
  return (
    <TabPrimitive
      className={cx(tabsTriggerVariants(), className)}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabPanelProps) {
  return (
    <TabPanelPrimitive
      className={cx('text-sm flex-1 outline-none', className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
