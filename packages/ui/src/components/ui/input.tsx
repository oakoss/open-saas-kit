'use client';

import {
  Group,
  type GroupProps,
  Input as InputPrimitive,
  type InputProps as InputPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../lib/utils';

export const inputVariants = tv({
  base: [
    'relative block w-full appearance-none rounded-lg',
    'px-2.5 py-1.5 text-base/6 sm:text-sm/6',
    'text-foreground placeholder:text-muted-foreground',
    'border border-input bg-transparent',
    'hover:enabled:border-muted-foreground/30',
    'outline-hidden transition-colors',
    'focus:border-ring/70 focus:ring-3 focus:ring-ring/20',
    'focus:hover:enabled:border-ring/80',
    'invalid:border-destructive/70 focus:invalid:border-destructive/70',
    'focus:invalid:ring-destructive/20',
    'invalid:hover:enabled:border-destructive/80',
    'focus:invalid:hover:enabled:border-destructive/80',
    '[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden',
    'disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
    'in-disabled:bg-muted in-disabled:opacity-50',
    'forced-colors:in-disabled:text-[GrayText]',
    'dark:bg-input/30 dark:hover:enabled:bg-input/50',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'h-8',
      lg: 'h-9',
      sm: 'h-7 text-xs',
    },
  },
});

export type InputProps = InputPrimitiveProps &
  VariantProps<typeof inputVariants> & {
    ref?: React.Ref<HTMLInputElement>;
  };

export function Input({ className, size, ref, ...props }: InputProps) {
  return (
    <span className="relative block w-full" data-slot="control">
      <InputPrimitive
        ref={ref}
        className={cx(inputVariants({ size }), className)}
        data-slot="input"
        {...props}
      />
    </span>
  );
}

export const inputGroupVariants = tv({
  base: [
    'relative isolate block',
    // Icon positioning
    'has-[>[data-slot=icon]:last-child]:[&_input]:pr-10',
    'has-[>[data-slot=icon]:first-child]:[&_input]:pl-10',
    'sm:has-[>[data-slot=icon]:last-child]:[&_input]:pr-8',
    'sm:has-[>[data-slot=icon]:first-child]:[&_input]:pl-8',
    '*:data-[slot=icon]:pointer-events-none',
    '*:data-[slot=icon]:absolute',
    '*:data-[slot=icon]:top-2.5',
    '*:data-[slot=icon]:z-10',
    '*:data-[slot=icon]:size-4',
    '[&>[data-slot=icon]:first-child]:left-2.5',
    '[&>[data-slot=icon]:last-child]:right-2.5',
    // Loader positioning
    'has-[[data-slot=loader]:last-child]:[&_input]:pr-10',
    'has-[[data-slot=loader]:first-child]:[&_input]:pl-10',
    'sm:has-[[data-slot=loader]:last-child]:[&_input]:pr-8',
    'sm:has-[[data-slot=loader]:first-child]:[&_input]:pl-8',
    '*:data-[slot=loader]:pointer-events-none',
    '*:data-[slot=loader]:absolute',
    '*:data-[slot=loader]:top-2.5',
    '*:data-[slot=loader]:z-10',
    '*:data-[slot=loader]:size-4',
    '[&>[data-slot=loader]:first-child]:left-2.5',
    '[&>[data-slot=loader]:last-child]:right-2.5',
    // Default icon/loader colors
    "[&>[data-slot='icon']:not([class*='text-'])]:text-muted-foreground",
    "[&>[data-slot='loader']:not([class*='text-'])]:text-muted-foreground",
  ],
});

export type InputIconGroupProps = GroupProps &
  VariantProps<typeof inputGroupVariants>;

export function InputIconGroup({ className, ...props }: InputIconGroupProps) {
  return (
    <Group
      className={cx(inputGroupVariants(), className)}
      data-slot="control"
      {...props}
    />
  );
}
