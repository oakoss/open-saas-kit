'use client';

import { use } from 'react';
import {
  Slider as SliderPrimitive,
  SliderOutput as SliderOutputPrimitive,
  type SliderOutputProps,
  type SliderProps,
  SliderStateContext,
  SliderThumb as SliderThumbPrimitive,
  type SliderThumbProps,
  SliderTrack as SliderTrackPrimitive,
  type SliderTrackProps,
} from 'react-aria-components';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn, cx } from '../../../lib/utils';

export const sliderVariants = tv({
  base: [
    'group relative flex touch-none select-none flex-col',
    'disabled:opacity-50',
    'orientation-horizontal:w-full orientation-horizontal:min-w-fit orientation-horizontal:gap-y-2',
    'orientation-vertical:h-full orientation-vertical:min-h-fit orientation-vertical:w-1.5 orientation-vertical:items-center orientation-vertical:gap-y-2',
  ],
});

export function SliderGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center gap-x-3 *:data-[slot=icon]:size-5',
        className,
      )}
      {...props}
    />
  );
}

export function Slider({
  className,
  ...props
}: SliderProps & VariantProps<typeof sliderVariants>) {
  return (
    <SliderPrimitive
      className={cx(sliderVariants(), className)}
      data-slot="slider"
      {...props}
    />
  );
}

export function SliderOutput({ className, ...props }: SliderOutputProps) {
  return (
    <SliderOutputPrimitive
      className={cx('text-sm font-medium', className)}
      {...props}
    />
  );
}

export const sliderThumbVariants = tv({
  base: [
    'top-[50%] left-[50%] size-4 rounded-full',
    'border border-foreground/10 bg-white',
    'outline-hidden ring-ring/20 transition-[width,height]',
    'focus-visible:ring-4',
    'dragging:ring-4',
  ],
});

export function SliderThumb({
  className,
  ...props
}: SliderThumbProps & VariantProps<typeof sliderThumbVariants>) {
  return (
    <SliderThumbPrimitive
      className={cx(sliderThumbVariants(), className)}
      {...props}
    />
  );
}

export const sliderTrackVariants = tv({
  base: [
    'bg-secondary',
    'group/track relative cursor-default rounded-full',
    'grow',
    'group-orientation-horizontal:h-1.5 group-orientation-horizontal:w-full',
    'group-orientation-vertical:w-1.5 group-orientation-vertical:flex-1',
    'disabled:cursor-default disabled:opacity-60',
  ],
});

export function SliderTrack({
  className,
  children,
  ...props
}: SliderTrackProps & VariantProps<typeof sliderTrackVariants>) {
  return (
    <SliderTrackPrimitive
      className={cx(sliderTrackVariants(), className)}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === 'function'
            ? children(values)
            : (children ?? (
                <>
                  <SliderFill />
                  <SliderThumb />
                </>
              ))}
        </>
      )}
    </SliderTrackPrimitive>
  );
}

export const sliderFillVariants = tv({
  base: [
    'pointer-events-none absolute rounded-full bg-primary',
    'group-disabled/track:opacity-60',
    'group-orientation-horizontal/track:top-0 group-orientation-horizontal/track:h-full',
    'group-orientation-vertical/track:bottom-0 group-orientation-vertical/track:w-full',
    'forced-colors:bg-[Highlight]',
  ],
});

export function SliderFill({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sliderFillVariants>) {
  const state = use(SliderStateContext);
  const { orientation, values } = state ?? {};

  const getStyle = () => {
    const percent0 = (state?.getThumbPercent?.(0) ?? 0) * 100;
    const percent1 = (state?.getThumbPercent?.(1) ?? 0) * 100;

    if (values?.length === 1) {
      return orientation === 'horizontal'
        ? { width: `${percent0}%` }
        : { height: `${percent0}%` };
    }

    return orientation === 'horizontal'
      ? {
          left: `${percent0}%`,
          width: `${Math.abs(percent0 - percent1)}%`,
        }
      : {
          bottom: `${percent0}%`,
          height: `${Math.abs(percent0 - percent1)}%`,
        };
  };

  return (
    <div
      {...props}
      className={cn(sliderFillVariants(), className)}
      style={getStyle()}
    />
  );
}
