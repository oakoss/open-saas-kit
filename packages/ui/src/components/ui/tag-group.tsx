'use client';

import { RiCloseLine } from '@remixicon/react';
import {
  Button,
  Tag as TagPrimitive,
  TagGroup as TagGroupPrimitive,
  type TagGroupProps as TagGroupPrimitiveProps,
  TagList as TagListPrimitive,
  type TagListProps as TagListPrimitiveProps,
  type TagProps as TagPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

export const tagGroupVariants = tv({
  base: 'flex flex-col gap-2',
});

export type TagGroupProps = TagGroupPrimitiveProps & {
  ref?: React.Ref<HTMLDivElement>;
};

export function TagGroup({ className, ref, ...props }: TagGroupProps) {
  return (
    <TagGroupPrimitive
      ref={ref}
      className={cn(tagGroupVariants(), className)}
      data-slot="tag-group"
      {...props}
    />
  );
}

export const tagListVariants = tv({
  base: 'flex flex-wrap gap-1',
});

export type TagListProps<T extends object> = TagListPrimitiveProps<T>;

export function TagList<T extends object>({
  className,
  ...props
}: TagListProps<T>) {
  return (
    <TagListPrimitive
      className={cn(tagListVariants(), className)}
      data-slot="tag-list"
      {...props}
    />
  );
}

export const tagVariants = tv({
  base: [
    'inline-flex items-center gap-1 font-medium text-xs',
    'outline-hidden transition-colors cursor-default',
    'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'bg-(--tag-bg) text-(--tag-fg)',
    '[&_svg]:size-3 [&_svg]:shrink-0',
  ],
  compoundVariants: [
    {
      allowsRemoving: true,
      class: 'pr-1',
    },
  ],
  defaultVariants: {
    shape: 'pill',
    size: 'default',
    variant: 'secondary',
  },
  variants: {
    allowsRemoving: {
      false: '',
      true: '',
    },
    isDisabled: {
      true: 'opacity-50 pointer-events-none',
    },
    isSelected: {
      true: 'ring-2 ring-ring',
    },
    shape: {
      pill: 'rounded-full',
      square: 'rounded-md',
    },
    size: {
      default: 'h-6 px-2',
      lg: 'h-7 px-2.5 text-sm',
      sm: 'h-5 px-1.5',
    },
    variant: {
      danger:
        '[--tag-bg:var(--color-destructive)/10] [--tag-fg:var(--color-destructive)]',
      info: '[--tag-bg:oklch(0.9_0.1_230)] [--tag-fg:oklch(0.35_0.15_230)]',
      outline:
        'bg-transparent border border-border text-foreground [--tag-bg:transparent] [--tag-fg:var(--color-foreground)]',
      primary:
        '[--tag-bg:var(--color-primary)] [--tag-fg:var(--color-primary-foreground)]',
      secondary:
        '[--tag-bg:var(--color-secondary)] [--tag-fg:var(--color-secondary-foreground)]',
      success: '[--tag-bg:oklch(0.85_0.15_145)] [--tag-fg:oklch(0.3_0.15_145)]',
      warning: '[--tag-bg:oklch(0.9_0.15_85)] [--tag-fg:oklch(0.35_0.15_85)]',
    },
  },
});

export const tagRemoveButtonVariants = tv({
  base: [
    'rounded-full p-0.5',
    'hover:bg-black/10 dark:hover:bg-white/10',
    'focus:bg-black/10 dark:focus:bg-white/10',
    'outline-hidden cursor-default',
  ],
});

export type TagProps = TagPrimitiveProps & VariantProps<typeof tagVariants>;

export function Tag({
  children,
  className,
  shape,
  size,
  variant,
  ...props
}: TagProps) {
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <TagPrimitive
      className={cx(
        (renderProps) =>
          tagVariants({
            allowsRemoving: renderProps.allowsRemoving,
            isDisabled: renderProps.isDisabled,
            isSelected: renderProps.isSelected,
            shape,
            size,
            variant,
          }),
        className,
      )}
      data-slot="tag"
      textValue={textValue}
      {...props}
    >
      {cx(
        ({ allowsRemoving }, children) => (
          <>
            <span className="truncate">{children}</span>
            {allowsRemoving && (
              <Button
                className={tagRemoveButtonVariants()}
                data-slot="tag-remove"
                slot="remove"
              >
                <RiCloseLine aria-hidden="true" />
              </Button>
            )}
          </>
        ),
        children,
      )}
    </TagPrimitive>
  );
}
