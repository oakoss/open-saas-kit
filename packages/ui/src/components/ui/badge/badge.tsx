import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const badgeVariants = tv({
  base: [
    'inline-flex items-center gap-x-1.5 font-medium text-xs forced-colors:outline',
    'inset-ring inset-ring-(--badge-ring) bg-(--badge-bg) text-(--badge-fg) [--badge-ring:transparent]',
    'transition-colors duration-200',
    '[&>svg]:size-3 [&>svg]:shrink-0 [&>svg]:pointer-events-none',
  ],
  defaultVariants: {
    variant: 'primary',
    shape: 'pill',
  },
  variants: {
    variant: {
      danger:
        '[--badge-bg:var(--color-destructive)] [--badge-fg:var(--color-destructive-foreground)]',
      info: '[--badge-bg:oklch(0.9_0.1_230)] [--badge-fg:oklch(0.35_0.15_230)]',
      outline:
        '[--badge-ring:var(--color-border)] [--badge-bg:transparent] [--badge-fg:var(--color-foreground)]',
      primary:
        '[--badge-bg:var(--color-primary)] [--badge-fg:var(--color-primary-foreground)]',
      secondary:
        '[--badge-bg:var(--color-secondary)] [--badge-fg:var(--color-secondary-foreground)]',
      success:
        '[--badge-bg:oklch(0.85_0.15_145)] [--badge-fg:oklch(0.3_0.15_145)]',
      warning:
        '[--badge-bg:oklch(0.9_0.15_85)] [--badge-fg:oklch(0.35_0.15_85)]',
    },
    shape: {
      pill: 'rounded-full px-2.5 py-0.5',
      square: 'rounded-md px-2 py-0.5',
    },
  },
});

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = 'primary',
  shape = 'pill',
  ...props
}: BadgeProps) {
  return (
    <span
      className={badgeVariants({ className, shape, variant })}
      data-shape={shape}
      data-slot="badge"
      data-variant={variant}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
