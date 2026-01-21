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

import { cn, cx } from '../../lib/utils';
import { Button } from './button';

export const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50',
    'bg-black/15',
    'entering:animate-in entering:fade-in-0 entering:duration-200',
    'exiting:animate-out exiting:fade-out-0 exiting:duration-150',
    'supports-backdrop-filter:backdrop-blur-xs',
  ],
});

export const dialogContentVariants = tv({
  base: [
    'bg-background text-foreground',
    'ring-foreground/10 ring-1',
    'w-full rounded-t-2xl sm:rounded-xl shadow-lg',
    'relative overflow-hidden',
    'entering:animate-in entering:slide-in-from-bottom entering:duration-200',
    'entering:sm:slide-in-from-bottom-0 entering:sm:zoom-in-95',
    'exiting:animate-out exiting:slide-out-to-bottom exiting:duration-150',
    'exiting:sm:slide-out-to-bottom-0 exiting:sm:zoom-out-95',
    'max-w-[calc(100%-2rem)]',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      '2xl': 'sm:max-w-2xl',
      '3xl': 'sm:max-w-3xl',
      '4xl': 'sm:max-w-4xl',
      default: 'sm:max-w-md',
      full: 'sm:max-w-[calc(100%-4rem)]',
      lg: 'sm:max-w-lg',
      sm: 'sm:max-w-sm',
      xl: 'sm:max-w-xl',
    },
  },
});

export type DialogProps_ = DialogTriggerProps;

export function Dialog({ ...props }: DialogProps_) {
  return <DialogTriggerPrimitive data-slot="dialog" {...props} />;
}

export type DialogTriggerProps_ = React.ComponentProps<typeof ButtonPrimitive>;

export function DialogTrigger({ className, ...props }: DialogTriggerProps_) {
  return (
    <ButtonPrimitive
      className={cx('cursor-pointer', className)}
      data-slot="dialog-trigger"
      {...props}
    />
  );
}

export type DialogOverlayProps = ModalOverlayProps &
  VariantProps<typeof dialogOverlayVariants>;

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <ModalOverlay
      className={cx(dialogOverlayVariants(), className)}
      data-slot="dialog-overlay"
      {...props}
    />
  );
}

export type DialogContentProps = Omit<ModalOverlayProps, 'children'> &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
    role?: 'dialog' | 'alertdialog';
    children?: React.ReactNode;
  };

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  size,
  isDismissable = true,
  role = 'dialog',
  ...props
}: DialogContentProps) {
  return (
    <ModalOverlay
      className={cn(
        dialogOverlayVariants(),
        'grid grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4',
      )}
      data-slot="dialog-overlay"
      isDismissable={isDismissable}
      {...props}
    >
      <Modal
        className={cn(
          dialogContentVariants({ size }),
          'row-start-2',
          className as string,
        )}
        data-slot="dialog-content"
      >
        <DialogPrimitive
          className="relative flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden outline-hidden"
          role={role}
        >
          {children}
          {showCloseButton && isDismissable && (
            <ButtonPrimitive
              aria-label="Close"
              className="absolute top-2 right-2 z-50 grid size-8 place-content-center rounded-lg hover:bg-secondary focus:bg-secondary focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring sm:size-7"
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

export type DialogHeaderProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
};

export function DialogHeader({
  className,
  title,
  description,
  children,
  ...props
}: DialogHeaderProps) {
  return (
    <div
      className={cn('relative space-y-1 p-4 pb-2', className)}
      data-slot="dialog-header"
      {...props}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogDescription>{description}</DialogDescription>}
      {!title && typeof children === 'string' ? (
        <DialogTitle>{children}</DialogTitle>
      ) : (
        children
      )}
    </div>
  );
}

export type DialogTitleProps = HeadingProps;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <Heading
      className={cn(
        'text-balance font-semibold text-foreground text-lg/6 sm:text-base/6',
        className,
      )}
      data-slot="dialog-title"
      slot="title"
      {...props}
    />
  );
}

export type DialogDescriptionProps = React.ComponentProps<'p'>;

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <p
      className={cn(
        'text-pretty text-base/6 text-muted-foreground sm:text-sm/6',
        className,
      )}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export type DialogBodyProps = React.ComponentProps<'div'>;

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      className={cn(
        'isolate flex min-h-0 flex-1 flex-col overflow-auto px-4 py-1',
        className,
      )}
      data-slot="dialog-body"
      {...props}
    />
  );
}

export type DialogFooterProps = React.ComponentProps<'div'>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'bg-muted/50 mx-0 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  );
}

export type DialogCloseProps = React.ComponentProps<typeof Button>;

export function DialogClose({
  variant = 'outline',
  ...props
}: DialogCloseProps) {
  return <Button slot="close" variant={variant} {...props} />;
}
