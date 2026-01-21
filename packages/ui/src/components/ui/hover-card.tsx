'use client';

import * as React from 'react';
import {
  DialogTrigger,
  Popover as PopoverPrimitive,
  type PopoverProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

export const hoverCardContentVariants = tv({
  base: [
    'bg-popover text-popover-foreground',
    'ring-foreground/10 ring-1 rounded-lg shadow-md',
    'z-50 w-64 p-2.5 text-sm outline-hidden',
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

type HoverCardContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
};

const HoverCardContext = React.createContext<HoverCardContextValue | null>(
  null,
);

function useHoverCard() {
  const context = React.use(HoverCardContext);
  if (!context) {
    throw new Error('HoverCard components must be used within a HoverCard');
  }
  return context;
}

export type HoverCardProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
};

export function HoverCard({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  openDelay = 200,
  closeDelay = 300,
}: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [controlledOpen, onOpenChange],
  );

  const value = React.useMemo(
    () => ({ closeDelay, isOpen, openDelay, setIsOpen }),
    [isOpen, setIsOpen, openDelay, closeDelay],
  );

  return (
    <HoverCardContext value={value}>
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        {children}
      </DialogTrigger>
    </HoverCardContext>
  );
}

export type HoverCardTriggerProps = React.ComponentProps<'div'>;

export function HoverCardTrigger({
  className,
  children,
  ...props
}: HoverCardTriggerProps) {
  const { setIsOpen, openDelay, closeDelay } = useHoverCard();
  const openTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const handleMouseEnter = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  }, [setIsOpen, openDelay]);

  const handleMouseLeave = React.useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [setIsOpen, closeDelay]);

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className={cn('inline-block', className)}
      data-slot="hover-card-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

export type HoverCardContentProps = Omit<PopoverProps, 'children'> &
  VariantProps<typeof hoverCardContentVariants> & {
    children?: React.ReactNode;
  };

export function HoverCardContent({
  className,
  children,
  placement = 'bottom',
  offset = 8,
  ...props
}: HoverCardContentProps) {
  const { setIsOpen, closeDelay } = useHoverCard();
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const handleMouseEnter = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [setIsOpen, closeDelay]);

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <PopoverPrimitive
      className={cx(hoverCardContentVariants(), className)}
      data-slot="hover-card-content"
      offset={offset}
      placement={placement}
      {...props}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </PopoverPrimitive>
  );
}
