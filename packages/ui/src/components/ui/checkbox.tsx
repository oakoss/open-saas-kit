'use client';

import { RiCheckLine } from '@remixicon/react';
import {
  Checkbox as CheckboxPrimitive,
  type CheckboxProps as CheckboxPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../lib/utils';

export const checkboxVariants = tv({
  base: [
    'border-input dark:bg-input/30',
    'flex items-center justify-center rounded-lg border',
    'transition-colors outline-none',
    'peer relative shrink-0',
    'after:absolute after:-inset-x-3 after:-inset-y-2',
    'data-selected:bg-primary data-selected:text-primary-foreground',
    'dark:data-selected:bg-primary data-selected:border-primary',
    'aria-invalid:data-selected:border-primary aria-invalid:border-destructive',
    'dark:aria-invalid:border-destructive/50',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:ring-[3px]',
    'group-has-disabled/field:opacity-50',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'size-4 [&_svg]:size-3.5',
      lg: 'size-5 [&_svg]:size-4',
      sm: 'size-3.5 [&_svg]:size-3',
    },
  },
});

type CheckboxProps = CheckboxPrimitiveProps &
  VariantProps<typeof checkboxVariants>;

function Checkbox({ className, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive
      className={cx(checkboxVariants({ size }), className)}
      data-slot="checkbox"
      {...props}
    >
      {({ isSelected }) => (
        <div
          className="grid place-content-center text-current transition-none"
          data-slot="checkbox-indicator"
        >
          {isSelected && <RiCheckLine />}
        </div>
      )}
    </CheckboxPrimitive>
  );
}

export { Checkbox, type CheckboxProps };
