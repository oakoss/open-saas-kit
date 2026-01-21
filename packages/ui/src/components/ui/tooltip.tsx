'use client';

import {
  Button,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  type TooltipProps as TooltipPrimitiveProps,
  TooltipTrigger as TooltipTriggerPrimitive,
  type TooltipTriggerComponentProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cx } from '../../lib/utils';

export const tooltipVariants = tv({
  base: [
    'rounded-md px-3 py-1.5 text-xs',
    'bg-foreground text-background',
    'z-50 w-fit max-w-xs',
    'will-change-transform',
  ],
  variants: {
    isEntering: {
      true: [
        'animate-in fade-in-0 zoom-in-95',
        'placement-bottom:slide-in-from-top-2',
        'placement-left:slide-in-from-right-2',
        'placement-right:slide-in-from-left-2',
        'placement-top:slide-in-from-bottom-2',
      ],
    },
    isExiting: {
      true: [
        'animate-out fade-out-0 zoom-out-95',
        'placement-bottom:slide-out-to-top-2',
        'placement-left:slide-out-to-right-2',
        'placement-right:slide-out-to-left-2',
        'placement-top:slide-out-to-bottom-2',
      ],
    },
  },
});

export type TooltipProps = TooltipTriggerComponentProps;

export function Tooltip({ delay = 0, ...props }: TooltipProps) {
  return <TooltipTriggerPrimitive delay={delay} {...props} />;
}

export type TooltipTriggerProps = React.ComponentProps<typeof Button>;

export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <Button
      className={cx('cursor-pointer outline-hidden', className)}
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

export type TooltipContentProps = Omit<TooltipPrimitiveProps, 'children'> &
  VariantProps<typeof tooltipVariants> & {
    arrow?: boolean;
    children?: React.ReactNode;
  };

export function TooltipContent({
  className,
  children,
  offset = 8,
  arrow = true,
  placement,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive
      className={cx(
        (renderProps) => tooltipVariants({ ...renderProps }),
        className,
      )}
      data-slot="tooltip-content"
      offset={offset}
      placement={placement}
      {...props}
    >
      {arrow && (
        <OverlayArrow className="group">
          <svg
            className="block fill-foreground group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
            height={8}
            viewBox="0 0 8 8"
            width={8}
          >
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </TooltipPrimitive>
  );
}
