'use client';

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

export const alertDialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50',
    'bg-black/15',
    'entering:animate-in entering:fade-in-0 entering:duration-200',
    'exiting:animate-out exiting:fade-out-0 exiting:duration-150',
    'supports-backdrop-filter:backdrop-blur-xs',
  ],
});

export const alertDialogContentVariants = tv({
  base: [
    'bg-background text-foreground',
    'ring-foreground/10 ring-1',
    'w-full rounded-xl shadow-lg',
    'relative overflow-hidden',
    'grid gap-4 p-4',
    'entering:animate-in entering:fade-in-0 entering:zoom-in-95 entering:duration-200',
    'exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 exiting:duration-150',
    'max-w-[calc(100%-2rem)]',
  ],
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      sm: 'sm:max-w-xs',
      default: 'sm:max-w-sm',
    },
  },
});

export type AlertDialogProps = DialogTriggerProps;

export function AlertDialog({ ...props }: AlertDialogProps) {
  return <DialogTriggerPrimitive data-slot="alert-dialog" {...props} />;
}

export type AlertDialogTriggerProps = React.ComponentProps<
  typeof ButtonPrimitive
>;

export function AlertDialogTrigger({
  className,
  ...props
}: AlertDialogTriggerProps) {
  return (
    <ButtonPrimitive
      className={cx('cursor-pointer', className)}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

export type AlertDialogOverlayProps = ModalOverlayProps &
  VariantProps<typeof alertDialogOverlayVariants>;

export function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogOverlayProps) {
  return (
    <ModalOverlay
      className={cx(alertDialogOverlayVariants(), className)}
      data-slot="alert-dialog-overlay"
      {...props}
    />
  );
}

export type AlertDialogContentProps = Omit<ModalOverlayProps, 'children'> &
  VariantProps<typeof alertDialogContentVariants> & {
    children?: React.ReactNode;
  };

export function AlertDialogContent({
  className,
  children,
  size,
  isDismissable = false,
  ...props
}: AlertDialogContentProps) {
  return (
    <ModalOverlay
      className={cn(
        alertDialogOverlayVariants(),
        'flex items-center justify-center p-4',
      )}
      data-slot="alert-dialog-overlay"
      isDismissable={isDismissable}
      {...props}
    >
      <Modal
        className={cn(
          alertDialogContentVariants({ size }),
          className as string,
        )}
        data-size={size}
        data-slot="alert-dialog-content"
      >
        <DialogPrimitive
          className="group/alert-dialog-content relative flex flex-col outline-hidden"
          role="alertdialog"
        >
          {children}
        </DialogPrimitive>
      </Modal>
    </ModalOverlay>
  );
}

export type AlertDialogHeaderProps = React.ComponentProps<'div'>;

export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps) {
  return (
    <div
      className={cn(
        'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center',
        'has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4',
        'sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left',
        'sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
        className,
      )}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

export type AlertDialogFooterProps = React.ComponentProps<'div'>;

export function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      className={cn(
        'bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4',
        'flex flex-col-reverse gap-2',
        'group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2',
        'sm:flex-row sm:justify-end',
        className,
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

export type AlertDialogMediaProps = React.ComponentProps<'div'>;

export function AlertDialogMedia({
  className,
  ...props
}: AlertDialogMediaProps) {
  return (
    <div
      className={cn(
        'bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md',
        "sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className,
      )}
      data-slot="alert-dialog-media"
      {...props}
    />
  );
}

export type AlertDialogTitleProps = HeadingProps;

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogTitleProps) {
  return (
    <Heading
      className={cn(
        'text-base font-medium',
        'sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
        className,
      )}
      data-slot="alert-dialog-title"
      slot="title"
      {...props}
    />
  );
}

export type AlertDialogDescriptionProps = React.ComponentProps<'p'>;

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <p
      className={cn(
        'text-muted-foreground text-sm text-balance md:text-pretty',
        '*:[a]:hover:text-foreground *:[a]:underline *:[a]:underline-offset-3',
        className,
      )}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

export type AlertDialogActionProps = React.ComponentProps<typeof Button>;

export function AlertDialogAction({
  className,
  ...props
}: AlertDialogActionProps) {
  return (
    <Button className={className} data-slot="alert-dialog-action" {...props} />
  );
}

export type AlertDialogCancelProps = React.ComponentProps<typeof Button>;

export function AlertDialogCancel({
  variant = 'outline',
  ...props
}: AlertDialogCancelProps) {
  return (
    <Button
      data-slot="alert-dialog-cancel"
      slot="close"
      variant={variant}
      {...props}
    />
  );
}
