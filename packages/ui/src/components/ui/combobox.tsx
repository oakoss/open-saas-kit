'use client';

import { RiArrowDownSLine, RiCheckLine } from '@remixicon/react';
import {
  Button,
  Collection,
  ComboBox as ComboBoxPrimitive,
  type ComboBoxProps as ComboBoxPrimitiveProps,
  Group,
  Header,
  Input,
  ListBox,
  ListBoxItem as ListBoxItemPrimitive,
  type ListBoxItemProps,
  ListBoxSection,
  type ListBoxSectionProps,
  Popover,
  type PopoverProps,
  Separator,
  type SeparatorProps,
  Text,
  type TextProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

export const comboboxVariants = tv({
  base: 'group/combobox w-full',
});

export type ComboBoxProps<T extends object> = ComboBoxPrimitiveProps<T> &
  VariantProps<typeof comboboxVariants>;

export function ComboBox<T extends object>({
  className,
  ...props
}: ComboBoxProps<T>) {
  return (
    <ComboBoxPrimitive
      className={cx(comboboxVariants(), className)}
      data-slot="combobox"
      {...props}
    />
  );
}

export const comboboxTriggerVariants = tv({
  base: [
    'flex w-full items-center gap-1',
    'rounded-lg border border-input bg-transparent',
    'text-foreground',
    'cursor-default outline-hidden transition-colors',
    'hover:enabled:border-muted-foreground/30',
    'focus-within:border-ring/70 focus-within:ring-3 focus-within:ring-ring/20',
    'group-open/combobox:border-ring/70 group-open/combobox:ring-3 group-open/combobox:ring-ring/20',
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

export type ComboBoxTriggerProps = React.ComponentProps<typeof Group> &
  VariantProps<typeof comboboxTriggerVariants>;

export function ComboBoxTrigger({
  children,
  className,
  size,
  ...props
}: ComboBoxTriggerProps) {
  return (
    <Group
      className={cx(comboboxTriggerVariants({ size }), className)}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
    </Group>
  );
}

export const comboboxInputVariants = tv({
  base: [
    'flex-1 bg-transparent outline-hidden',
    'text-base/6 sm:text-sm/6',
    'text-foreground placeholder:text-muted-foreground',
    'disabled:cursor-not-allowed',
    '[&::-ms-reveal]:hidden',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'px-2.5 py-1.5',
      lg: 'px-3 py-2',
      sm: 'px-2 py-1 text-xs',
    },
  },
});

export type ComboBoxInputProps = React.ComponentProps<typeof Input> &
  VariantProps<typeof comboboxInputVariants>;

export function ComboBoxInput({
  className,
  size,
  ...props
}: ComboBoxInputProps) {
  return (
    <Input
      className={cx(comboboxInputVariants({ size }), className)}
      data-slot="combobox-input"
      {...props}
    />
  );
}

export const comboboxButtonVariants = tv({
  base: [
    'flex items-center justify-center',
    'px-2 text-muted-foreground',
    'cursor-default outline-hidden',
    'hover:text-foreground',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
});

export type ComboBoxButtonProps = React.ComponentProps<typeof Button>;

export function ComboBoxButton({ className, ...props }: ComboBoxButtonProps) {
  return (
    <Button
      className={cx(comboboxButtonVariants(), className)}
      data-slot="combobox-button"
      {...props}
    >
      <RiArrowDownSLine className="size-4 shrink-0" />
    </Button>
  );
}

export const comboboxContentVariants = tv({
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

export type ComboBoxContentProps<T extends object> = PopoverProps & {
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  items?: Iterable<T>;
};

export function ComboBoxContent<T extends object>({
  children,
  className,
  items,
  ...props
}: ComboBoxContentProps<T>) {
  return (
    <Popover
      className={cx(comboboxContentVariants(), className)}
      data-slot="combobox-content"
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

export const comboboxItemVariants = tv({
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

export type ComboBoxItemProps = ListBoxItemProps &
  VariantProps<typeof comboboxItemVariants>;

export function ComboBoxItem({
  children,
  className,
  ...props
}: ComboBoxItemProps) {
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <ListBoxItemPrimitive
      className={cx(
        (renderProps) => comboboxItemVariants({ ...renderProps }),
        className,
      )}
      data-slot="combobox-item"
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

export const comboboxSectionVariants = tv({
  base: 'col-span-full grid grid-cols-[auto_1fr]',
});

export type ComboBoxSectionProps<T extends object> = ListBoxSectionProps<T> & {
  title?: string;
};

export function ComboBoxSection<T extends object>({
  children,
  className,
  items,
  title,
  ...props
}: ComboBoxSectionProps<T>) {
  return (
    <ListBoxSection
      className={cn(comboboxSectionVariants(), className)}
      data-slot="combobox-section"
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

export type ComboBoxLabelProps = TextProps;

export function ComboBoxLabel({ className, ...props }: ComboBoxLabelProps) {
  return (
    <Text
      className={cn('col-start-2', className)}
      data-slot="combobox-label"
      slot="label"
      {...props}
    />
  );
}

export type ComboBoxDescriptionProps = TextProps;

export function ComboBoxDescription({
  className,
  ...props
}: ComboBoxDescriptionProps) {
  return (
    <Text
      className={cn('col-start-2 text-sm text-muted-foreground', className)}
      data-slot="combobox-description"
      slot="description"
      {...props}
    />
  );
}

export type ComboBoxSeparatorProps = Omit<SeparatorProps, 'orientation'>;

export function ComboBoxSeparator({
  className,
  ...props
}: ComboBoxSeparatorProps) {
  return (
    <Separator
      className={cn('col-span-full -mx-1 my-1 h-px bg-border', className)}
      data-slot="combobox-separator"
      orientation="horizontal"
      {...props}
    />
  );
}
