'use client';

import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../lib/utils';
import { buttonVariants } from './button';

export const linkVariants = tv({
  base: [
    'outline-hidden transition-colors',
    'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'text-primary underline-offset-4 hover:underline',
      destructive: 'text-destructive hover:text-destructive/80',
      ghost: 'text-foreground hover:text-primary',
      muted: 'text-muted-foreground hover:text-foreground',
    },
  },
});

export type LinkProps = Omit<LinkPrimitiveProps, 'className'> &
  VariantProps<typeof linkVariants> & {
    asButton?: boolean;
    buttonSize?: VariantProps<typeof buttonVariants>['size'];
    buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
    className?: string;
    ref?: React.Ref<HTMLAnchorElement>;
  };

export function Link({
  asButton,
  buttonSize,
  buttonVariant,
  className,
  ref,
  variant,
  ...props
}: LinkProps) {
  return (
    <LinkPrimitive
      ref={ref}
      className={cx(
        asButton
          ? buttonVariants({ size: buttonSize, variant: buttonVariant })
          : linkVariants({ variant }),
        className,
      )}
      data-slot="link"
      {...props}
    />
  );
}
