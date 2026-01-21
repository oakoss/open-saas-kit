'use client';

import { createContext, use } from 'react';
import {
  Label,
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps,
  type ProgressBarRenderProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../lib/utils';

const ProgressContext = createContext<ProgressBarRenderProps | null>(null);

export const progressVariants = tv({
  base: [
    'w-full',
    '[&>[data-slot=progress-header]+[data-slot=progress-track]]:mt-2',
    '[&>[data-slot=progress-header]+[slot=description]]:mt-1',
    "[&>[slot='description']+[data-slot=progress-track]]:mt-2",
    '[&>[data-slot=progress-track]+[slot=description]]:mt-2',
    '*:data-[slot=progress-header]:font-medium',
  ],
});

export function Progress({
  className,
  children,
  ...props
}: ProgressBarProps & VariantProps<typeof progressVariants>) {
  return (
    <ProgressBarPrimitive
      className={cx(progressVariants(), className)}
      data-slot="progress"
      {...props}
    >
      {(values) => (
        <ProgressContext value={{ ...values }}>
          {typeof children === 'function' ? children(values) : children}
        </ProgressContext>
      )}
    </ProgressBarPrimitive>
  );
}

export function ProgressHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      data-slot="progress-header"
      {...props}
    />
  );
}

export function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn('text-sm font-medium', className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

export function ProgressValue({
  className,
  ...props
}: Omit<React.ComponentProps<'span'>, 'children'>) {
  const context = use(ProgressContext);
  const valueText = context?.valueText ?? '';
  return (
    <span
      className={cn('text-muted-foreground text-sm tabular-nums', className)}
      data-slot="progress-value"
      {...props}
    >
      {valueText}
    </span>
  );
}

export const progressTrackVariants = tv({
  base: [
    'relative h-1.5 w-full overflow-hidden rounded-full',
    'bg-secondary',
    'outline-1 outline-transparent -outline-offset-1',
  ],
});

export function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof progressTrackVariants>) {
  const context = use(ProgressContext);
  const { isIndeterminate, percentage } = context ?? {};

  return (
    <div className="relative block w-full" data-slot="progress-track">
      <style>{`
        @keyframes progress-slide {
          0% { left: 0% }
          50% { left: 100% }
          100% { left: 0% }
        }
      `}</style>
      <div className={cn(progressTrackVariants(), className)} {...props}>
        {isIndeterminate ? (
          <div
            className="absolute top-0 h-full animate-[progress-slide_2000ms_ease-in-out_infinite] rounded-full bg-primary forced-colors:bg-[Highlight]"
            data-slot="progress-indicator"
            style={{ width: '40%' }}
          />
        ) : (
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-primary transition-[width] duration-200 ease-linear will-change-[width] motion-reduce:transition-none forced-colors:bg-[Highlight]"
            data-slot="progress-indicator"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
