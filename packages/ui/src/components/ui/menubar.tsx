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
  Toolbar,
  type ToolbarProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

export const menubarVariants = tv({
  base: [
    'bg-background',
    'h-8 gap-0.5 rounded-lg border p-1',
    'flex items-center',
  ],
});

export const menubarContentVariants = tv({
  base: [
    'bg-popover text-popover-foreground',
    'ring-foreground/10 ring-1 rounded-lg shadow-md',
    'z-50 min-w-36 p-1 outline-hidden',
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

export const menubarItemVariants = tv({
  base: [
    'relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none',
    'focus:bg-accent focus:text-accent-foreground',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    'group/menubar-item',
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

export const menubarSectionVariants = tv({
  base: 'flex flex-col gap-0.5',
});

export const menubarTriggerVariants = tv({
  base: [
    'hover:bg-muted data-open:bg-muted',
    'rounded-sm px-1.5 py-px text-sm font-medium',
    'flex items-center outline-hidden select-none cursor-default',
  ],
});

export type MenubarProps = ToolbarProps & VariantProps<typeof menubarVariants>;

export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <Toolbar
      className={cn(menubarVariants(), className as string)}
      data-slot="menubar"
      orientation="horizontal"
      {...props}
    />
  );
}

export type MenubarMenuProps = MenuTriggerProps;

export function MenubarMenu({ ...props }: MenubarMenuProps) {
  return <MenuTriggerPrimitive data-slot="menubar-menu" {...props} />;
}

export type MenubarTriggerProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof menubarTriggerVariants>;

export function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return (
    <Button
      className={cx(menubarTriggerVariants(), className)}
      data-slot="menubar-trigger"
      {...props}
    />
  );
}

export type MenubarContentProps = PopoverProps &
  VariantProps<typeof menubarContentVariants>;

export function MenubarContent({
  className,
  children,
  offset = 8,
  ...props
}: MenubarContentProps) {
  return (
    <Popover
      className={cx(menubarContentVariants(), className)}
      data-slot="menubar-content"
      offset={offset}
      placement="bottom start"
      {...props}
    >
      {children}
    </Popover>
  );
}

export type MenubarListProps<T extends object> = MenuPrimitiveProps<T>;

export function MenubarList<T extends object>({
  className,
  ...props
}: MenubarListProps<T>) {
  return (
    <MenuPrimitive
      className={cn('outline-hidden', className as string)}
      data-slot="menubar-list"
      {...props}
    />
  );
}

export type MenubarGroupProps = React.ComponentProps<'div'>;

export function MenubarGroup({ className, ...props }: MenubarGroupProps) {
  return (
    <div
      className={cn('flex flex-col gap-0.5', className)}
      data-slot="menubar-group"
      role="group"
      {...props}
    />
  );
}

export type MenubarLabelProps = React.ComponentProps<typeof Header> & {
  inset?: boolean;
};

export function MenubarLabel({
  className,
  inset,
  ...props
}: MenubarLabelProps) {
  return (
    <Header
      className={cn(
        'px-1.5 py-1 text-sm font-medium data-inset:pl-8',
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="menubar-label"
      {...props}
    />
  );
}

export type MenubarItemProps = Omit<MenuItemPrimitiveProps, 'children'> &
  VariantProps<typeof menubarItemVariants> & {
    children?: React.ReactNode;
  };

export function MenubarItem({
  className,
  children,
  variant,
  inset,
  ...props
}: MenubarItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(
        (renderProps) =>
          menubarItemVariants({ ...renderProps, inset, variant }),
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="menubar-item"
      data-variant={variant}
      textValue={textValue}
      {...props}
    >
      {children}
    </MenuItemPrimitive>
  );
}

export type MenubarSubProps = SubmenuTriggerProps;

export function MenubarSub({ ...props }: MenubarSubProps) {
  return <SubmenuTriggerPrimitive data-slot="menubar-sub" {...props} />;
}

export type MenubarSubTriggerProps = Omit<MenuItemPrimitiveProps, 'children'> &
  VariantProps<typeof menubarItemVariants> & {
    children?: React.ReactNode;
  };

export function MenubarSubTrigger({
  className,
  children,
  inset,
  ...props
}: MenubarSubTriggerProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(
        (renderProps) => menubarItemVariants({ ...renderProps, inset }),
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="menubar-sub-trigger"
      textValue={textValue}
      {...props}
    >
      {children}
      <RiArrowRightSLine className="ml-auto" />
    </MenuItemPrimitive>
  );
}

export type MenubarSubContentProps = PopoverProps;

export function MenubarSubContent({
  className,
  offset = 0,
  crossOffset = -4,
  ...props
}: MenubarSubContentProps) {
  return (
    <Popover
      className={cx(menubarContentVariants(), 'min-w-32 shadow-lg', className)}
      crossOffset={crossOffset}
      data-slot="menubar-sub-content"
      offset={offset}
      placement="right top"
      {...props}
    />
  );
}

export type MenubarCheckboxItemProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export function MenubarCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: MenubarCheckboxItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(menubarItemVariants(), 'py-1 pr-1.5 pl-7', className)}
      data-slot="menubar-checkbox-item"
      textValue={textValue}
      onAction={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className="left-1.5 size-4 [&_svg:not([class*='size-'])]:size-4 pointer-events-none absolute flex items-center justify-center"
        data-slot="menubar-checkbox-item-indicator"
      >
        {checked && <RiCheckLine />}
      </span>
      {children}
    </MenuItemPrimitive>
  );
}

export type MenubarRadioGroupProps<T extends object> = Omit<
  MenuSectionPrimitiveProps<T>,
  'children'
> & {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
};

export function MenubarRadioGroup<T extends object>({
  className,
  value,
  onValueChange,
  children,
  ...props
}: MenubarRadioGroupProps<T>) {
  const selectedKeys = value ? new Set([value]) : new Set<string>();

  return (
    <MenuSectionPrimitive
      className={cn(menubarSectionVariants(), className)}
      data-slot="menubar-radio-group"
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

export type MenubarRadioItemProps = Omit<MenuItemPrimitiveProps, 'children'> & {
  value?: string;
  children?: React.ReactNode;
};

export function MenubarRadioItem({
  className,
  children,
  value,
  ...props
}: MenubarRadioItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(menubarItemVariants(), 'py-1 pr-1.5 pl-7', className)}
      data-slot="menubar-radio-item"
      id={value}
      textValue={textValue}
      {...props}
    >
      {cx(
        ({ isSelected }, children) => (
          <>
            <span
              className="left-1.5 size-4 [&_svg:not([class*='size-'])]:size-4 pointer-events-none absolute flex items-center justify-center"
              data-slot="menubar-radio-item-indicator"
            >
              {isSelected && <RiCheckLine />}
            </span>
            {children}
          </>
        ),
        children,
      )}
    </MenuItemPrimitive>
  );
}

export type MenubarSectionProps<T extends object> =
  MenuSectionPrimitiveProps<T>;

export function MenubarSection<T extends object>({
  className,
  ...props
}: MenubarSectionProps<T>) {
  return (
    <MenuSectionPrimitive
      className={cn(menubarSectionVariants(), className)}
      data-slot="menubar-section"
      {...props}
    />
  );
}

export type MenubarSeparatorProps = SeparatorProps;

export function MenubarSeparator({
  className,
  ...props
}: MenubarSeparatorProps) {
  return (
    <Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot="menubar-separator"
      {...props}
    />
  );
}

export type MenubarShortcutProps = React.ComponentProps<'span'>;

export function MenubarShortcut({ className, ...props }: MenubarShortcutProps) {
  return (
    <span
      className={cn(
        'text-muted-foreground group-focus/menubar-item:text-accent-foreground text-xs tracking-widest ml-auto',
        className,
      )}
      data-slot="menubar-shortcut"
      {...props}
    />
  );
}

export { Collection as MenubarCollection } from 'react-aria-components';
