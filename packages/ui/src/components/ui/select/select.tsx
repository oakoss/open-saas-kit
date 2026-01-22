'use client';

import { RiArrowDownSLine, RiCheckLine } from '@remixicon/react';
import {
  Button,
  Collection,
  Header,
  ListBox,
  ListBoxItem as ListBoxItemPrimitive,
  type ListBoxItemProps,
  ListBoxSection,
  type ListBoxSectionProps,
  Popover,
  type PopoverProps,
  Select as SelectPrimitive,
  type SelectProps as SelectPrimitiveProps,
  SelectValue as SelectValuePrimitive,
  Separator,
  type SeparatorProps,
  Text,
  type TextProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../../lib/utils';

export const selectVariants = tv({
  base: 'group/select w-full',
});

export type SelectProps<T extends object> = SelectPrimitiveProps<T> &
  VariantProps<typeof selectVariants>;

export function Select<T extends object>({
  className,
  ...props
}: SelectProps<T>) {
  return (
    <SelectPrimitive
      className={cx(selectVariants(), className)}
      data-slot="select"
      {...props}
    />
  );
}

export const selectTriggerVariants = tv({
  base: [
    'flex w-full items-center justify-between gap-2',
    'rounded-lg border border-input bg-transparent',
    'px-2.5 py-1.5 text-base/6 sm:text-sm/6',
    'text-foreground',
    'cursor-default outline-hidden transition-colors',
    'hover:enabled:border-muted-foreground/30',
    'focus:border-ring/70 focus:ring-3 focus:ring-ring/20',
    'group-open/select:border-ring/70 group-open/select:ring-3 group-open/select:ring-ring/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'dark:bg-input/30 dark:hover:enabled:bg-input/50',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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

export type SelectTriggerProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof selectTriggerVariants>;

export function SelectTrigger({
  className,
  size,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <Button
      className={cx(selectTriggerVariants({ size }), className)}
      data-slot="select-trigger"
      {...props}
    >
      {cx(
        (_, children) => (
          <>
            {children ?? (
              <SelectValuePrimitive
                className="flex-1 truncate text-left data-placeholder:text-muted-foreground"
                data-slot="select-value"
              />
            )}
            <RiArrowDownSLine className="text-muted-foreground size-4 shrink-0" />
          </>
        ),
        children,
      )}
    </Button>
  );
}

export type SelectValueProps = React.ComponentProps<
  typeof SelectValuePrimitive
>;

export function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectValuePrimitive
      className={cx(
        'flex-1 truncate text-left data-placeholder:text-muted-foreground',
        className,
      )}
      data-slot="select-value"
      {...props}
    />
  );
}

export const selectContentVariants = tv({
  base: [
    'bg-popover text-popover-foreground',
    'ring-foreground/10 ring-1 rounded-lg shadow-md',
    'min-w-(--trigger-width) max-h-60',
    'overflow-y-auto overscroll-contain',
    'entering:animate-in entering:fade-in-0 entering:zoom-in-95',
    'exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95',
    'placement-bottom:slide-in-from-top-2',
    'placement-top:slide-in-from-bottom-2',
    'placement-left:slide-in-from-right-2',
    'placement-right:slide-in-from-left-2',
    'duration-100',
  ],
});

export type SelectContentProps<T extends object> = PopoverProps & {
  items?: Iterable<T>;
  className?: string;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
};

export function SelectContent<T extends object>({
  className,
  items,
  children,
  ...props
}: SelectContentProps<T>) {
  return (
    <Popover
      className={cx(selectContentVariants(), className)}
      data-slot="select-content"
      offset={4}
      {...props}
    >
      <ListBox
        className="grid w-full grid-cols-[auto_1fr] gap-y-0.5 p-1 outline-hidden"
        items={items}
      >
        {children}
      </ListBox>
    </Popover>
  );
}

export const selectItemVariants = tv({
  base: [
    'col-span-full grid grid-cols-subgrid',
    'relative cursor-default select-none items-center',
    'rounded-md px-2 py-1.5 text-sm',
    'outline-hidden',
    'text-foreground',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    '*:data-[slot=icon]:mr-2 *:data-[slot=icon]:text-muted-foreground',
  ],
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-50',
    },
    isFocused: {
      true: 'bg-accent text-accent-foreground *:data-[slot=icon]:text-accent-foreground',
    },
    isSelected: {
      true: '*:data-[slot=icon]:text-accent-foreground',
    },
  },
});

export type SelectItemProps = ListBoxItemProps &
  VariantProps<typeof selectItemVariants>;

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <ListBoxItemPrimitive
      className={cx(
        (renderProps) => selectItemVariants({ ...renderProps }),
        className,
      )}
      data-slot="select-item"
      textValue={textValue}
      {...props}
    >
      {cx(
        ({ isSelected }, children) => (
          <>
            {isSelected && (
              <RiCheckLine
                className="mr-2 size-4 shrink-0"
                data-slot="check-indicator"
              />
            )}
            {!isSelected && <span className="mr-2 size-4" />}
            <span className="truncate">
              {typeof children === 'string' ? children : children}
            </span>
          </>
        ),
        children,
      )}
    </ListBoxItemPrimitive>
  );
}

export const selectSectionVariants = tv({
  base: 'col-span-full grid grid-cols-[auto_1fr]',
});

export type SelectSectionProps<T extends object> = ListBoxSectionProps<T> & {
  title?: string;
};

export function SelectSection<T extends object>({
  className,
  title,
  children,
  items,
  ...props
}: SelectSectionProps<T>) {
  return (
    <ListBoxSection
      className={cn(selectSectionVariants(), className)}
      data-slot="select-section"
      {...props}
    >
      {title && (
        <Header className="col-span-full px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {title}
        </Header>
      )}
      <Collection items={items}>{children}</Collection>
    </ListBoxSection>
  );
}

export type SelectLabelProps = TextProps;

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <Text
      className={cn('col-start-2', className)}
      data-slot="select-label"
      slot="label"
      {...props}
    />
  );
}

export type SelectDescriptionProps = TextProps;

export function SelectDescription({
  className,
  ...props
}: SelectDescriptionProps) {
  return (
    <Text
      className={cn('col-start-2 text-sm text-muted-foreground', className)}
      data-slot="select-description"
      slot="description"
      {...props}
    />
  );
}

export type SelectSeparatorProps = Omit<SeparatorProps, 'orientation'>;

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <Separator
      className={cn('col-span-full -mx-1 my-1 h-px bg-border', className)}
      data-slot="select-separator"
      orientation="horizontal"
      {...props}
    />
  );
}
