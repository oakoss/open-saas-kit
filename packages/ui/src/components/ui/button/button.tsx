'use client';

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../../lib/utils';

export const buttonVariants = tv({
  base: [
    // CSS custom properties for theming
    '[--btn-border:var(--color-border)] [--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-foreground)] [--btn-icon:currentColor]',
    // Base styles
    'relative isolate inline-flex items-center justify-center rounded-lg border border-transparent font-medium outline-none',
    'bg-(--btn-bg) text-(--btn-fg) transition-all select-none',
    // Focus styles
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    // Invalid styles
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:ring-[3px]',
    // Disabled/pending styles
    'disabled:pointer-events-none disabled:opacity-50',
    'pending:opacity-50',
    // Icon slot styling
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:size-4 *:data-[slot=icon]:text-(--btn-icon)',
    // Loader slot styling
    '*:data-[slot=loader]:-mx-0.5 *:data-[slot=loader]:shrink-0 *:data-[slot=loader]:size-4 *:data-[slot=loader]:text-(--btn-icon)',
    // Legacy SVG styling for backwards compatibility
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
  variants: {
    isCircle: {
      true: 'rounded-full',
    },
    size: {
      default: [
        'h-8 gap-1.5 px-2.5 text-sm',
        'has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
      ],
      icon: ['size-8', '*:data-[slot=icon]:size-4'],
      'icon-lg': ['size-9', '*:data-[slot=icon]:size-4.5'],
      'icon-sm': [
        'size-7 rounded-[min(var(--radius-md),12px)]',
        'in-data-[slot=button-group]:rounded-lg',
        '*:data-[slot=icon]:size-3.5',
      ],
      'icon-xs': [
        'size-6 rounded-[min(var(--radius-md),10px)]',
        'in-data-[slot=button-group]:rounded-lg',
        "*:data-[slot=icon]:size-3 [&_svg:not([class*='size-'])]:size-3",
      ],
      lg: [
        'h-9 gap-1.5 px-3 text-sm',
        'has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        '*:data-[slot=icon]:size-4.5',
      ],
      sm: [
        'h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem]',
        'in-data-[slot=button-group]:rounded-lg',
        'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        "*:data-[slot=icon]:size-3.5 [&_svg:not([class*='size-'])]:size-3.5",
      ],
      xs: [
        'h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs',
        'in-data-[slot=button-group]:rounded-lg',
        'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        "*:data-[slot=icon]:size-3 [&_svg:not([class*='size-'])]:size-3",
      ],
    },
    variant: {
      default: [
        '[--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-foreground)] [--btn-icon:var(--color-primary-foreground)]',
        'hover:bg-primary/80',
      ],
      destructive: [
        '[--btn-bg:var(--color-destructive)/10] [--btn-fg:var(--color-destructive)] [--btn-icon:var(--color-destructive)]',
        'hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30',
        'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 focus-visible:border-destructive/40',
      ],
      ghost: [
        '[--btn-bg:transparent] [--btn-fg:var(--color-foreground)] [--btn-icon:var(--color-muted-foreground)]',
        'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50',
        'aria-expanded:bg-muted aria-expanded:text-foreground',
      ],
      link: [
        '[--btn-bg:transparent] [--btn-fg:var(--color-primary)] [--btn-icon:var(--color-primary)]',
        'border-transparent underline-offset-4 hover:underline',
      ],
      outline: [
        '[--btn-bg:var(--color-background)] [--btn-fg:var(--color-foreground)] [--btn-icon:var(--color-muted-foreground)]',
        'border-(--btn-border) dark:bg-input/30 dark:border-input',
        'hover:bg-muted hover:text-foreground dark:hover:bg-input/50',
        'aria-expanded:bg-muted aria-expanded:text-foreground',
      ],
      plain: [
        '[--btn-bg:transparent] [--btn-fg:var(--color-foreground)] [--btn-icon:var(--color-muted-foreground)]',
        'border-transparent',
        'hover:bg-muted/50',
      ],
      secondary: [
        '[--btn-bg:var(--color-secondary)] [--btn-fg:var(--color-secondary-foreground)] [--btn-icon:var(--color-muted-foreground)]',
        'hover:bg-secondary/80',
        'aria-expanded:bg-secondary',
      ],
    },
  },
});

export type ButtonProps = ButtonPrimitiveProps &
  VariantProps<typeof buttonVariants> & {
    ref?: React.Ref<HTMLButtonElement>;
  };

export function Button({
  className,
  variant,
  size,
  isCircle,
  ref,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      ref={ref}
      className={cx(buttonVariants({ isCircle, size, variant }), className)}
      data-slot="button"
      {...props}
    />
  );
}
