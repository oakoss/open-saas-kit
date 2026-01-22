'use client';

import { RiCloseLine, RiSearchLine } from '@remixicon/react';
import {
  Button,
  Group,
  Input,
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps as SearchFieldPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../../lib/utils';

export const searchFieldVariants = tv({
  base: 'group/search-field w-full',
});

export const searchFieldGroupVariants = tv({
  base: [
    'relative isolate flex items-center',
    'rounded-lg border border-input bg-transparent',
    'text-foreground',
    'outline-hidden transition-colors',
    'focus-within:border-ring/70 focus-within:ring-3 focus-within:ring-ring/20',
    'hover:enabled:border-muted-foreground/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'dark:bg-input/30 dark:hover:enabled:bg-input/50',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'h-8',
      lg: 'h-9',
      sm: 'h-7',
    },
  },
});

export const searchFieldInputVariants = tv({
  base: [
    'flex-1 bg-transparent outline-hidden',
    'text-base/6 sm:text-sm/6',
    'text-foreground placeholder:text-muted-foreground',
    'disabled:cursor-not-allowed',
    '[&::-webkit-search-cancel-button]:hidden [&::-ms-reveal]:hidden',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'px-2',
      lg: 'px-2.5',
      sm: 'px-1.5 text-xs',
    },
  },
});

export const searchFieldIconVariants = tv({
  base: 'shrink-0 text-muted-foreground pointer-events-none',
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'size-4 ml-2.5',
      lg: 'size-4 ml-3',
      sm: 'size-3.5 ml-2',
    },
  },
});

export const searchFieldClearVariants = tv({
  base: [
    'shrink-0 grid place-content-center',
    'rounded-md cursor-default',
    'text-muted-foreground',
    'hover:bg-muted hover:text-foreground',
    'focus:bg-muted focus:text-foreground',
    'outline-hidden',
    'group-data-empty/search-field:hidden',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'size-6 mr-1 [&_svg]:size-3.5',
      lg: 'size-7 mr-1 [&_svg]:size-4',
      sm: 'size-5 mr-0.5 [&_svg]:size-3',
    },
  },
});

export type SearchFieldProps = Omit<SearchFieldPrimitiveProps, 'className'> &
  VariantProps<typeof searchFieldGroupVariants> & {
    className?: string;
    placeholder?: string;
    ref?: React.Ref<HTMLDivElement>;
  };

export function SearchField({
  className,
  placeholder = 'Search...',
  ref,
  size,
  ...props
}: SearchFieldProps) {
  return (
    <SearchFieldPrimitive
      ref={ref}
      className={cx(searchFieldVariants(), className)}
      data-slot="search-field"
      {...props}
    >
      <Group
        className={searchFieldGroupVariants({ size })}
        data-slot="search-field-group"
      >
        <RiSearchLine
          aria-hidden="true"
          className={searchFieldIconVariants({ size })}
          data-slot="icon"
        />
        <Input
          className={searchFieldInputVariants({ size })}
          data-slot="search-field-input"
          placeholder={placeholder}
        />
        <Button
          className={searchFieldClearVariants({ size })}
          data-slot="search-field-clear"
        >
          <RiCloseLine aria-hidden="true" />
        </Button>
      </Group>
    </SearchFieldPrimitive>
  );
}
