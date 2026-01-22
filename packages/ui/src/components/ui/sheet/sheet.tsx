'use client';

import { RiCloseLine } from '@remixicon/react';
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../../lib/utils';

export const sheetOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50',
    'bg-black/15',
    'entering:animate-in entering:fade-in-0 entering:duration-300',
    'exiting:animate-out exiting:fade-out-0 exiting:duration-200',
    'supports-backdrop-filter:backdrop-blur-xs',
  ],
});

export const sheetContentVariants = tv({
  base: [
    'bg-background text-foreground',
    'fixed z-50 flex flex-col gap-4 shadow-lg',
    'transform-gpu transition ease-in-out will-change-transform',
    'entering:animate-in entering:duration-300',
    'exiting:animate-out exiting:duration-200',
  ],
  compoundVariants: [
    {
      className: 'inset-x-2 bottom-2 rounded-2xl',
      isFloat: true,
      side: 'bottom',
    },
    {
      className: 'inset-x-2 top-2 rounded-2xl',
      isFloat: true,
      side: 'top',
    },
    {
      className: 'inset-y-2 left-2 rounded-xl',
      isFloat: true,
      side: 'left',
    },
    {
      className: 'inset-y-2 right-2 rounded-xl',
      isFloat: true,
      side: 'right',
    },
  ],
  defaultVariants: {
    side: 'right',
    isFloat: false,
  },
  variants: {
    side: {
      bottom: [
        'inset-x-0 bottom-0 h-auto border-t rounded-t-2xl',
        'entering:slide-in-from-bottom exiting:slide-out-to-bottom',
      ],
      left: [
        'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        'entering:slide-in-from-left exiting:slide-out-to-left',
      ],
      right: [
        'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        'entering:slide-in-from-right exiting:slide-out-to-right',
      ],
      top: [
        'inset-x-0 top-0 h-auto border-t rounded-b-2xl',
        'entering:slide-in-from-top exiting:slide-out-to-top',
      ],
    },
    isFloat: {
      true: 'rounded-xl ring ring-border/10 border-0',
      false: '',
    },
  },
});

export type SheetProps = DialogTriggerProps;

export function Sheet({ ...props }: SheetProps) {
  return <DialogTriggerPrimitive data-slot="sheet" {...props} />;
}

export type SheetTriggerProps = React.ComponentProps<typeof ButtonPrimitive>;

export function SheetTrigger({ className, ...props }: SheetTriggerProps) {
  return (
    <ButtonPrimitive
      className={cx('cursor-pointer', className)}
      data-slot="sheet-trigger"
      {...props}
    />
  );
}

export type SheetContentProps = Omit<ModalOverlayProps, 'children'> &
  VariantProps<typeof sheetContentVariants> & {
    showCloseButton?: boolean;
    children?: React.ReactNode;
  };

export function SheetContent({
  className,
  children,
  side = 'right',
  isFloat = false,
  showCloseButton = true,
  isDismissable = true,
  ...props
}: SheetContentProps) {
  return (
    <ModalOverlay
      className={cx(sheetOverlayVariants())}
      data-slot="sheet-overlay"
      isDismissable={isDismissable}
      {...props}
    >
      <Modal
        className={cn(sheetContentVariants({ side, isFloat }), className)}
        data-float={isFloat || undefined}
        data-side={side}
        data-slot="sheet-content"
      >
        <DialogPrimitive className="relative flex h-full flex-col overflow-hidden outline-hidden">
          {children}
          {showCloseButton && isDismissable && (
            <ButtonPrimitive
              aria-label="Close"
              className="absolute top-3 right-3 z-50 grid size-8 place-content-center rounded-lg hover:bg-secondary focus:bg-secondary focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring sm:size-7"
              data-slot="sheet-close"
              slot="close"
            >
              <RiCloseLine className="size-4" />
            </ButtonPrimitive>
          )}
        </DialogPrimitive>
      </Modal>
    </ModalOverlay>
  );
}

export type SheetHeaderProps = React.ComponentProps<'div'>;

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn('flex flex-col gap-0.5 p-4', className)}
      data-slot="sheet-header"
      {...props}
    />
  );
}

export type SheetFooterProps = React.ComponentProps<'div'>;

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

export type SheetTitleProps = HeadingProps;

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <Heading
      className={cn('text-base font-medium text-foreground', className)}
      data-slot="sheet-title"
      slot="title"
      {...props}
    />
  );
}

export type SheetDescriptionProps = React.ComponentProps<'p'>;

export function SheetDescription({
  className,
  ...props
}: SheetDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export type SheetCloseProps = React.ComponentProps<typeof ButtonPrimitive>;

export function SheetClose({ className, ...props }: SheetCloseProps) {
  return (
    <ButtonPrimitive
      className={cx('cursor-pointer', className)}
      data-slot="sheet-close"
      slot="close"
      {...props}
    />
  );
}
