'use client';

import {
  Separator as SeparatorPrimitive,
  type SeparatorProps,
} from 'react-aria-components';

import { cn } from '../../../lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      className={cn(
        'bg-border shrink-0 orientation-horizontal:h-px orientation-horizontal:w-full orientation-vertical:w-px orientation-vertical:self-stretch',
        className,
      )}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
