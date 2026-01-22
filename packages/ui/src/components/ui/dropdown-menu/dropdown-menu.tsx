'use client';

import { RiArrowRightSLine, RiCheckLine } from '@remixicon/react';
import {
  Button,
  Header,
  Menu as MenuPrimitive,
  MenuItem as MenuItemPrimitive,
  type MenuItemProps as MenuItemPrimitiveProps,
  type MenuProps as MenuPrimitiveProps,
  MenuSection as MenuSectionPrimitive,
  type MenuSectionProps as MenuSectionPrimitiveProps,
  MenuTrigger as MenuTriggerPrimitive,
  type MenuTriggerProps,
  Popover,
  type PopoverProps,
  Separator,
  type SeparatorProps,
  SubmenuTrigger as SubmenuTriggerPrimitive,
  type SubmenuTriggerProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../../lib/utils';

export const dropdownMenuContentVariants = tv({
  base: [
    'bg-popover text-popover-foreground',
    'ring-foreground/10 ring-1 rounded-lg shadow-md',
    'z-50 min-w-32 p-1 outline-hidden',
    'max-h-(--visual-viewport-height) overflow-y-auto',
    'entering:animate-in exiting:animate-out',
    'entering:fade-in-0 exiting:fade-out-0',
    'entering:zoom-in-95 exiting:zoom-out-95',
    'placement-bottom:slide-in-from-top-2',
    'placement-left:slide-in-from-right-2',
    'placement-right:slide-in-from-left-2',
    'placement-top:slide-in-from-bottom-2',
    'duration-100',
  ],
});

export const dropdownMenuItemVariants = tv({
  base: [
    'relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none',
    'focus:bg-accent focus:text-accent-foreground',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    'group/dropdown-menu-item',
  ],
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'focus:**:text-accent-foreground',
      destructive: [
        'text-destructive',
        'focus:bg-destructive/10 dark:focus:bg-destructive/20',
        'focus:text-destructive',
        '*:[svg]:text-destructive',
      ],
    },
    inset: {
      true: 'pl-8',
    },
  },
});

export const dropdownMenuSectionVariants = tv({
  base: 'flex flex-col gap-0.5',
});

export type DropdownMenuProps = MenuTriggerProps;

export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <MenuTriggerPrimitive data-slot="dropdown-menu" {...props} />;
}

export type DropdownMenuTriggerProps = React.ComponentProps<typeof Button>;

export function DropdownMenuTrigger({
  className,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <Button
      className={cx('cursor-pointer outline-hidden', className)}
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export type DropdownMenuContentProps = PopoverProps &
  VariantProps<typeof dropdownMenuContentVariants>;

export function DropdownMenuContent({
  className,
  children,
  placement = 'bottom',
  offset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Popover
      className={cx(dropdownMenuContentVariants(), className)}
      data-slot="dropdown-menu-content"
      offset={offset}
      placement={placement}
      {...props}
    >
      {children}
    </Popover>
  );
}

export type DropdownMenuListProps<T extends object> = MenuPrimitiveProps<T>;

export function DropdownMenuList<T extends object>({
  className,
  ...props
}: DropdownMenuListProps<T>) {
  return (
    <MenuPrimitive
      className={cn('outline-hidden', className as string)}
      data-slot="dropdown-menu-list"
      {...props}
    />
  );
}

export type DropdownMenuGroupProps = React.ComponentProps<'div'>;

export function DropdownMenuGroup({
  className,
  ...props
}: DropdownMenuGroupProps) {
  return (
    <div
      className={cn('flex flex-col gap-0.5', className)}
      data-slot="dropdown-menu-group"
      role="group"
      {...props}
    />
  );
}

export type DropdownMenuLabelProps = React.ComponentProps<typeof Header> & {
  inset?: boolean;
};

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <Header
      className={cn(
        'text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-8',
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}

export type DropdownMenuItemProps = Omit<MenuItemPrimitiveProps, 'children'> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    children?: React.ReactNode;
  };

export function DropdownMenuItem({
  className,
  children,
  variant,
  inset,
  ...props
}: DropdownMenuItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(
        (renderProps) =>
          dropdownMenuItemVariants({ ...renderProps, inset, variant }),
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      textValue={textValue}
      {...props}
    >
      {children}
    </MenuItemPrimitive>
  );
}

export type DropdownMenuSubProps = SubmenuTriggerProps;

export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <SubmenuTriggerPrimitive data-slot="dropdown-menu-sub" {...props} />;
}

export type DropdownMenuSubTriggerProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    children?: React.ReactNode;
  };

export function DropdownMenuSubTrigger({
  className,
  children,
  inset,
  ...props
}: DropdownMenuSubTriggerProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(
        (renderProps) => dropdownMenuItemVariants({ ...renderProps, inset }),
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="dropdown-menu-sub-trigger"
      textValue={textValue}
      {...props}
    >
      {children}
      <RiArrowRightSLine className="ml-auto" />
    </MenuItemPrimitive>
  );
}

export type DropdownMenuSubContentProps = PopoverProps;

export function DropdownMenuSubContent({
  className,
  offset = 0,
  crossOffset = -4,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <Popover
      className={cx(
        dropdownMenuContentVariants(),
        'min-w-24 shadow-lg',
        className,
      )}
      crossOffset={crossOffset}
      data-slot="dropdown-menu-sub-content"
      offset={offset}
      {...props}
    />
  );
}

export type DropdownMenuCheckboxItemProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: DropdownMenuCheckboxItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(dropdownMenuItemVariants(), 'py-1 pr-8 pl-1.5', className)}
      data-slot="dropdown-menu-checkbox-item"
      textValue={textValue}
      onAction={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        {checked && <RiCheckLine className="size-4" />}
      </span>
      {children}
    </MenuItemPrimitive>
  );
}

export type DropdownMenuRadioGroupProps<T extends object> = Omit<
  MenuSectionPrimitiveProps<T>,
  'children'
> & {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
};

export function DropdownMenuRadioGroup<T extends object>({
  className,
  value,
  onValueChange,
  children,
  ...props
}: DropdownMenuRadioGroupProps<T>) {
  const selectedKeys = value ? new Set([value]) : new Set<string>();

  return (
    <MenuSectionPrimitive
      className={cn(dropdownMenuSectionVariants(), className)}
      data-slot="dropdown-menu-radio-group"
      selectedKeys={selectedKeys}
      selectionMode="single"
      onSelectionChange={(keys) => {
        const selected = [...keys][0];
        if (typeof selected === 'string') {
          onValueChange?.(selected);
        }
      }}
      {...props}
    >
      {children}
    </MenuSectionPrimitive>
  );
}

export type DropdownMenuRadioItemProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> & {
  value?: string;
  children?: React.ReactNode;
};

export function DropdownMenuRadioItem({
  className,
  children,
  value,
  ...props
}: DropdownMenuRadioItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(dropdownMenuItemVariants(), 'py-1 pr-8 pl-1.5', className)}
      data-slot="dropdown-menu-radio-item"
      id={value}
      textValue={textValue}
      {...props}
    >
      {cx(
        ({ isSelected }, children) => (
          <>
            <span
              className="pointer-events-none absolute right-2 flex items-center justify-center"
              data-slot="dropdown-menu-radio-item-indicator"
            >
              {isSelected && <RiCheckLine className="size-4" />}
            </span>
            {children}
          </>
        ),
        children,
      )}
    </MenuItemPrimitive>
  );
}

export type DropdownMenuSectionProps<T extends object> =
  MenuSectionPrimitiveProps<T>;

export function DropdownMenuSection<T extends object>({
  className,
  ...props
}: DropdownMenuSectionProps<T>) {
  return (
    <MenuSectionPrimitive
      className={cn(dropdownMenuSectionVariants(), className)}
      data-slot="dropdown-menu-section"
      {...props}
    />
  );
}

export type DropdownMenuSeparatorProps = SeparatorProps;

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
}

export type DropdownMenuShortcutProps = React.ComponentProps<'span'>;

export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn(
        'text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
}

export { Collection as DropdownMenuCollection } from 'react-aria-components';
