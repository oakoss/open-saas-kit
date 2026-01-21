'use client';

import { RiArrowDownSLine } from '@remixicon/react';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import {
  Button,
  type ButtonProps,
  Link,
  type LinkProps,
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  Popover,
  type PopoverProps,
} from 'react-aria-components';

import { cn, cx } from '../../lib/utils';

type NavigationMenuContextValue = {
  orientation: 'horizontal' | 'vertical';
};

const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null);

type NavigationMenuProps = React.ComponentProps<'nav'> & {
  orientation?: 'horizontal' | 'vertical';
};

function NavigationMenu({
  className,
  orientation = 'horizontal',
  children,
  ...props
}: NavigationMenuProps) {
  const contextValue = React.useMemo(() => ({ orientation }), [orientation]);

  return (
    <NavigationMenuContext value={contextValue}>
      <nav
        className={cn(
          'max-w-max group/navigation-menu relative flex flex-1 items-center justify-center',
          className,
        )}
        data-orientation={orientation}
        data-slot="navigation-menu"
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext>
  );
}

type NavigationMenuListProps = React.ComponentProps<'ul'>;

function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <ul
      className={cn(
        'gap-0 group flex flex-1 list-none items-center justify-center',
        className,
      )}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
}

type NavigationMenuItemProps = React.ComponentProps<'li'>;

function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  return (
    <li
      className={cn('relative', className)}
      data-slot="navigation-menu-item"
      {...props}
    />
  );
}

export const navigationMenuTriggerStyle = cva(
  'bg-background hover:bg-muted focus:bg-muted data-[open]:bg-muted/50 focus-visible:ring-ring/50 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:opacity-50 group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center disabled:pointer-events-none outline-none cursor-pointer',
);

type NavigationMenuTriggerProps = ButtonProps & {
  showArrow?: boolean;
};

function NavigationMenuTrigger({
  className,
  children,
  showArrow = true,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <MenuTrigger>
      <Button
        className={cx(navigationMenuTriggerStyle(), 'group', className)}
        data-slot="navigation-menu-trigger"
        {...props}
      >
        <>
          {children}
          {showArrow && (
            <RiArrowDownSLine
              aria-hidden="true"
              className="relative top-px ml-1 size-3 transition duration-300 group-data-[open]:rotate-180"
            />
          )}
        </>
      </Button>
    </MenuTrigger>
  );
}

type NavigationMenuContentProps = Omit<PopoverProps, 'children'> & {
  children?: React.ReactNode;
};

function NavigationMenuContent({
  className,
  children,
  ...props
}: NavigationMenuContentProps) {
  return (
    <Popover
      className={cn(
        'bg-popover text-popover-foreground ring-foreground/10 rounded-lg shadow-sm ring-1',
        'entering:animate-in exiting:animate-out',
        'entering:fade-in-0 exiting:fade-out-0',
        'entering:zoom-in-95 exiting:zoom-out-95',
        'placement-bottom:slide-in-from-top-2',
        'placement-top:slide-in-from-bottom-2',
        'p-1',
        className,
      )}
      data-slot="navigation-menu-content"
      offset={8}
      placement="bottom start"
      {...props}
    >
      {children}
    </Popover>
  );
}

type NavigationMenuPopoverProps = MenuProps<object>;

function NavigationMenuPopover({
  className,
  ...props
}: NavigationMenuPopoverProps) {
  return (
    <Menu
      className={cn('outline-hidden', className)}
      data-slot="navigation-menu-popover"
      {...props}
    />
  );
}

type NavigationMenuLinkProps = MenuItemProps | LinkProps;

function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  const isMenuItem = 'onAction' in props || !('href' in props);

  if (isMenuItem) {
    return (
      <MenuItem
        className={cn(
          "hover:bg-muted focus:bg-muted flex items-center gap-2 rounded-md p-2 text-sm transition-all outline-none cursor-default [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        data-slot="navigation-menu-link"
        {...(props as MenuItemProps)}
      />
    );
  }

  return (
    <Link
      className={cn(
        "hover:bg-muted focus:bg-muted flex items-center gap-2 rounded-md p-2 text-sm transition-all outline-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="navigation-menu-link"
      {...(props as LinkProps)}
    />
  );
}

type NavigationMenuIndicatorProps = React.ComponentProps<'div'>;

function NavigationMenuIndicator({
  className,
  ...props
}: NavigationMenuIndicatorProps) {
  return (
    <div
      className={cn(
        'top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      data-slot="navigation-menu-indicator"
      {...props}
    >
      <div className="bg-border rounded-tl-sm shadow-md relative top-[60%] size-2 rotate-45" />
    </div>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopover,
  NavigationMenuTrigger,
};
