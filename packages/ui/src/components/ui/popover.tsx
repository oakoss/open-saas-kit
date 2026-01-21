'use client';

import {
  Button as ButtonPrimitive,
  DialogTrigger,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  OverlayArrow,
  Popover as PopoverPrimitive,
  type PopoverProps as PopoverPrimitiveProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

export const popoverContentVariants = tv({
  base: [
    'bg-popover text-popover-foreground',
    'ring-foreground/10 ring-1 rounded-lg shadow-md',
    'z-50 outline-hidden',
    'flex flex-col gap-2.5 p-2.5 text-sm',
    'min-w-(--trigger-width) max-w-xs',
    'entering:animate-in exiting:animate-out',
    'entering:fade-in-0 exiting:fade-out-0',
    'entering:zoom-in-95 exiting:zoom-out-95',
    'placement-bottom:slide-in-from-top-2',
    'placement-left:slide-in-from-right-2',
    'placement-right:slide-in-from-left-2',
    'placement-top:slide-in-from-bottom-2',
    'duration-100',
  ],
  defaultVariants: {
    width: 'default',
  },
  variants: {
    width: {
      anchor: 'w-(--trigger-width)',
      auto: 'w-auto max-w-none',
      default: 'w-72',
      lg: 'w-80',
      sm: 'w-56',
      xl: 'w-96',
    },
  },
});

export type PopoverProps = DialogTriggerProps;

export function Popover({ ...props }: PopoverProps) {
  return <DialogTrigger data-slot="popover" {...props} />;
}

export type PopoverTriggerProps = React.ComponentProps<typeof ButtonPrimitive>;

export function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  return (
    <ButtonPrimitive
      className={cx('cursor-pointer', className)}
      data-slot="popover-trigger"
      {...props}
    />
  );
}

export type PopoverContentProps = PopoverPrimitiveProps &
  VariantProps<typeof popoverContentVariants> & {
    arrow?: boolean;
  };

export function PopoverContent({
  className,
  children,
  width,
  arrow = false,
  offset,
  ...props
}: PopoverContentProps) {
  const resolvedOffset = offset ?? (arrow ? 12 : 8);

  return (
    <PopoverPrimitive
      className={cx(popoverContentVariants({ width }), className)}
      data-slot="popover-content"
      offset={resolvedOffset}
      {...props}
    >
      {(values) => (
        <>
          {arrow && (
            <OverlayArrow className="group">
              <svg
                className="block fill-popover stroke-border group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
                height={12}
                viewBox="0 0 12 12"
                width={12}
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
            </OverlayArrow>
          )}
          <div
            className="max-h-[inherit] overflow-y-auto"
            data-slot="popover-inner"
          >
            {typeof children === 'function' ? children(values) : children}
          </div>
        </>
      )}
    </PopoverPrimitive>
  );
}

export type PopoverHeaderProps = React.ComponentProps<'div'>;

export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-0.5 text-sm', className)}
      data-slot="popover-header"
      {...props}
    />
  );
}

export type PopoverTitleProps = HeadingProps;

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <Heading
      className={cn('font-medium', className)}
      data-slot="popover-title"
      slot="title"
      {...props}
    />
  );
}

export type PopoverDescriptionProps = React.ComponentProps<'p'>;

export function PopoverDescription({
  className,
  ...props
}: PopoverDescriptionProps) {
  return (
    <p
      className={cn('text-muted-foreground', className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

export type PopoverBodyProps = React.ComponentProps<'div'>;

export function PopoverBody({ className, ...props }: PopoverBodyProps) {
  return (
    <div
      className={cn('isolate flex min-h-0 flex-1 flex-col', className)}
      data-slot="popover-body"
      {...props}
    />
  );
}

export type PopoverFooterProps = React.ComponentProps<'div'>;

export function PopoverFooter({ className, ...props }: PopoverFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 justify-start has-[button]:justify-end sm:flex-row',
        className,
      )}
      data-slot="popover-footer"
      {...props}
    />
  );
}
