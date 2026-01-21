'use client';

import { RiArrowRightSLine, RiCheckLine } from '@remixicon/react';
import * as React from 'react';
import {
  Header,
  Menu as MenuPrimitive,
  MenuItem as MenuItemPrimitive,
  type MenuItemProps as MenuItemPrimitiveProps,
  type MenuProps as MenuPrimitiveProps,
  MenuSection as MenuSectionPrimitive,
  type MenuSectionProps as MenuSectionPrimitiveProps,
  MenuTrigger as MenuTriggerPrimitive,
  Popover,
  type PopoverProps,
  Separator,
  type SeparatorProps,
  SubmenuTrigger as SubmenuTriggerPrimitive,
  type SubmenuTriggerProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

export const contextMenuContentVariants = tv({
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

export const contextMenuItemVariants = tv({
  base: [
    'relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none',
    'focus:bg-accent focus:text-accent-foreground',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    'group/context-menu-item',
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

export const contextMenuSectionVariants = tv({
  base: 'flex flex-col gap-0.5',
});

type ContextMenuContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number } | null) => void;
};

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(
  null,
);

function useContextMenu() {
  const context = React.use(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu');
  }
  return context;
}

export type ContextMenuProps = {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function ContextMenu({ children, onOpenChange }: ContextMenuProps) {
  const [openState, setOpenState] = React.useState(false);
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      setOpenState(open);
      onOpenChange?.(open);
      if (!open) {
        setPosition(null);
      }
    },
    [onOpenChange],
  );

  const value = React.useMemo(
    () => ({ isOpen: openState, position, setIsOpen, setPosition }),
    [openState, setIsOpen, position],
  );

  return (
    <ContextMenuContext value={value}>
      <MenuTriggerPrimitive isOpen={openState} onOpenChange={setIsOpen}>
        {children}
      </MenuTriggerPrimitive>
    </ContextMenuContext>
  );
}

export type ContextMenuTriggerProps = React.ComponentProps<'div'>;

export function ContextMenuTrigger({
  className,
  children,
  onContextMenu,
  ...props
}: ContextMenuTriggerProps) {
  const { setIsOpen, setPosition } = useContextMenu();

  const handleContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
      setIsOpen(true);
      onContextMenu?.(event);
    },
    [setIsOpen, setPosition, onContextMenu],
  );

  return (
    <div
      className={cn('select-none', className)}
      data-slot="context-menu-trigger"
      onContextMenu={handleContextMenu}
      {...props}
    >
      {children}
    </div>
  );
}

export type ContextMenuContentProps = Omit<PopoverProps, 'children'> &
  VariantProps<typeof contextMenuContentVariants> & {
    children?: React.ReactNode;
  };

export function ContextMenuContent({
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  const { position } = useContextMenu();

  return (
    <Popover
      className={cx(contextMenuContentVariants(), className)}
      data-slot="context-menu-content"
      offset={0}
      placement="bottom start"
      style={
        position
          ? {
              left: position.x,
              position: 'fixed',
              top: position.y,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </Popover>
  );
}

export type ContextMenuListProps<T extends object> = MenuPrimitiveProps<T>;

export function ContextMenuList<T extends object>({
  className,
  ...props
}: ContextMenuListProps<T>) {
  return (
    <MenuPrimitive
      className={cn('outline-hidden', className as string)}
      data-slot="context-menu-list"
      {...props}
    />
  );
}

export type ContextMenuGroupProps = React.ComponentProps<'div'>;

export function ContextMenuGroup({
  className,
  ...props
}: ContextMenuGroupProps) {
  return (
    <div
      className={cn('flex flex-col gap-0.5', className)}
      data-slot="context-menu-group"
      role="group"
      {...props}
    />
  );
}

export type ContextMenuLabelProps = React.ComponentProps<typeof Header> & {
  inset?: boolean;
};

export function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  return (
    <Header
      className={cn(
        'text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-8',
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="context-menu-label"
      {...props}
    />
  );
}

export type ContextMenuItemProps = Omit<MenuItemPrimitiveProps, 'children'> &
  VariantProps<typeof contextMenuItemVariants> & {
    children?: React.ReactNode;
  };

export function ContextMenuItem({
  className,
  children,
  variant,
  inset,
  ...props
}: ContextMenuItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(
        (renderProps) =>
          contextMenuItemVariants({ ...renderProps, inset, variant }),
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="context-menu-item"
      data-variant={variant}
      textValue={textValue}
      {...props}
    >
      {children}
    </MenuItemPrimitive>
  );
}

export type ContextMenuSubProps = SubmenuTriggerProps;

export function ContextMenuSub({ ...props }: ContextMenuSubProps) {
  return <SubmenuTriggerPrimitive data-slot="context-menu-sub" {...props} />;
}

export type ContextMenuSubTriggerProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> &
  VariantProps<typeof contextMenuItemVariants> & {
    children?: React.ReactNode;
  };

export function ContextMenuSubTrigger({
  className,
  children,
  inset,
  ...props
}: ContextMenuSubTriggerProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(
        (renderProps) => contextMenuItemVariants({ ...renderProps, inset }),
        className,
      )}
      data-inset={inset ?? undefined}
      data-slot="context-menu-sub-trigger"
      textValue={textValue}
      {...props}
    >
      {children}
      <RiArrowRightSLine className="ml-auto" />
    </MenuItemPrimitive>
  );
}

export type ContextMenuSubContentProps = Omit<PopoverProps, 'children'> & {
  children?: React.ReactNode;
};

export function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <Popover
      className={cx(contextMenuContentVariants(), 'shadow-lg', className)}
      crossOffset={-4}
      data-slot="context-menu-sub-content"
      offset={0}
      placement="right top"
      {...props}
    />
  );
}

export type ContextMenuCheckboxItemProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
};

export function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: ContextMenuCheckboxItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(contextMenuItemVariants(), 'py-1 pr-8 pl-1.5', className)}
      data-slot="context-menu-checkbox-item"
      textValue={textValue}
      onAction={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="context-menu-checkbox-item-indicator"
      >
        {checked && <RiCheckLine className="size-4" />}
      </span>
      {children}
    </MenuItemPrimitive>
  );
}

export type ContextMenuRadioGroupProps<T extends object> = Omit<
  MenuSectionPrimitiveProps<T>,
  'children'
> & {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
};

export function ContextMenuRadioGroup<T extends object>({
  className,
  value,
  onValueChange,
  children,
  ...props
}: ContextMenuRadioGroupProps<T>) {
  const selectedKeys = value ? new Set([value]) : new Set<string>();

  return (
    <MenuSectionPrimitive
      className={cn(contextMenuSectionVariants(), className)}
      data-slot="context-menu-radio-group"
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

export type ContextMenuRadioItemProps = Omit<
  MenuItemPrimitiveProps,
  'children'
> & {
  value?: string;
  children?: React.ReactNode;
};

export function ContextMenuRadioItem({
  className,
  children,
  value,
  ...props
}: ContextMenuRadioItemProps) {
  const textValue =
    props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <MenuItemPrimitive
      className={cx(contextMenuItemVariants(), 'py-1 pr-8 pl-1.5', className)}
      data-slot="context-menu-radio-item"
      id={value}
      textValue={textValue}
      {...props}
    >
      {cx(
        ({ isSelected }, children) => (
          <>
            <span
              className="pointer-events-none absolute right-2 flex items-center justify-center"
              data-slot="context-menu-radio-item-indicator"
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

export type ContextMenuSectionProps<T extends object> =
  MenuSectionPrimitiveProps<T>;

export function ContextMenuSection<T extends object>({
  className,
  ...props
}: ContextMenuSectionProps<T>) {
  return (
    <MenuSectionPrimitive
      className={cn(contextMenuSectionVariants(), className)}
      data-slot="context-menu-section"
      {...props}
    />
  );
}

export type ContextMenuSeparatorProps = SeparatorProps;

export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparatorProps) {
  return (
    <Separator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
}

export type ContextMenuShortcutProps = React.ComponentProps<'span'>;

export function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcutProps) {
  return (
    <span
      className={cn(
        'text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      data-slot="context-menu-shortcut"
      {...props}
    />
  );
}

export { Collection as ContextMenuCollection } from 'react-aria-components';
