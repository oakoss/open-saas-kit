'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';

type ScrollAreaProps = React.ComponentProps<'div'> & {
  orientation?: 'vertical' | 'horizontal' | 'both';
};

function ScrollArea({
  className,
  children,
  orientation = 'vertical',
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn('relative', className)}
      data-slot="scroll-area"
      {...props}
    >
      <div
        className={cn(
          'size-full rounded-[inherit] outline-none',
          // Custom scrollbar styling
          '[&::-webkit-scrollbar]:size-2.5',
          '[&::-webkit-scrollbar-track]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border',
          '[&::-webkit-scrollbar-corner]:bg-transparent',
          // Firefox scrollbar styling
          'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border',
          // Overflow based on orientation
          orientation === 'vertical' && 'overflow-y-auto overflow-x-hidden',
          orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
          orientation === 'both' && 'overflow-auto',
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </div>
    </div>
  );
}

type ScrollBarProps = React.ComponentProps<'div'> & {
  orientation?: 'vertical' | 'horizontal';
};

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: ScrollBarProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute',
        orientation === 'horizontal' &&
          'bottom-0 left-0 right-0 h-2.5 border-t border-t-transparent',
        orientation === 'vertical' &&
          'top-0 right-0 bottom-0 w-2.5 border-l border-l-transparent',
        className,
      )}
      data-orientation={orientation}
      data-slot="scroll-area-scrollbar"
      {...props}
    />
  );
}

export { ScrollArea, ScrollBar };
