import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../../lib/utils';
import { Separator } from '../separator';

const buttonGroupVariants = tv({
  base: [
    'flex w-fit items-stretch',
    'has-[>[data-slot=button-group]]:gap-2',
    '*:focus-visible:z-10 *:focus-visible:relative',
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
    'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg',
    '[&>input]:flex-1',
  ],
  defaultVariants: {
    orientation: 'horizontal',
  },
  variants: {
    orientation: {
      horizontal: [
        '*:data-slot:rounded-r-none',
        '[&>[data-slot]~[data-slot]]:rounded-l-none',
        '[&>[data-slot]~[data-slot]]:border-l-0',
        '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!',
      ],
      vertical: [
        'flex-col',
        '*:data-slot:rounded-b-none',
        '[&>[data-slot]~[data-slot]]:rounded-t-none',
        '[&>[data-slot]~[data-slot]]:border-t-0',
        '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!',
      ],
    },
  },
});

type ButtonGroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof buttonGroupVariants>;

function ButtonGroup({
  className,
  orientation = 'horizontal',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={buttonGroupVariants({ orientation, className })}
      data-orientation={orientation}
      data-slot="button-group"
      role="group"
      {...props}
    />
  );
}

function ButtonGroupText({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium',
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="button-group-text"
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn(
        'bg-input relative self-stretch',
        'orientation-horizontal:mx-px orientation-horizontal:w-auto',
        'orientation-vertical:my-px orientation-vertical:h-auto',
        className,
      )}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
export type { ButtonGroupProps };
