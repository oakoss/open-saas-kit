'use client';

import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../../lib/utils';

type AvatarContextValue = {
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const context = React.use(AvatarContext);
  if (!context) {
    throw new Error('Avatar components must be used within an Avatar');
  }
  return context;
}

const avatarVariants = tv({
  base: [
    'relative flex shrink-0 select-none items-center justify-center overflow-hidden',
    'after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten',
  ],
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
  variants: {
    size: {
      '2xl': 'size-14 text-xl',
      '3xl': 'size-16 text-2xl',
      lg: 'size-10 text-base',
      md: 'size-8 text-sm',
      sm: 'size-6 text-xs',
      xl: 'size-12 text-lg',
      xs: 'size-5 text-[10px]',
    },
    shape: {
      circle: 'rounded-full after:rounded-full',
      square: 'rounded-[20%] after:rounded-[20%]',
    },
  },
});

type AvatarProps = React.ComponentProps<'span'> &
  VariantProps<typeof avatarVariants>;

function Avatar({
  className,
  size = 'md',
  shape = 'circle',
  children,
  ...props
}: AvatarProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const contextValue = React.useMemo(
    () => ({ imageLoaded, setImageLoaded }),
    [imageLoaded],
  );

  return (
    <AvatarContext value={contextValue}>
      <span
        className={avatarVariants({ className, shape, size })}
        data-shape={shape}
        data-size={size}
        data-slot="avatar"
        {...props}
      >
        {children}
      </span>
    </AvatarContext>
  );
}

type AvatarImageProps = React.ComponentProps<'img'>;

function AvatarImage({
  className,
  onLoad,
  onError,
  alt = '',
  ...props
}: AvatarImageProps) {
  const { imageLoaded, setImageLoaded } = useAvatarContext();

  const handleLoad = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoaded(true);
      onLoad?.(event);
    },
    [setImageLoaded, onLoad],
  );

  const handleError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoaded(false);
      onError?.(event);
    },
    [setImageLoaded, onError],
  );

  return (
    <img
      alt={alt}
      className={cn(
        'aspect-square size-full rounded-[inherit] object-cover',
        !imageLoaded && 'hidden',
        className,
      )}
      data-slot="avatar-image"
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
}

type AvatarFallbackProps = React.ComponentProps<'span'>;

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const { imageLoaded } = useAvatarContext();

  if (imageLoaded) {
    return null;
  }

  return (
    <span
      className={cn(
        'flex size-full items-center justify-center rounded-[inherit] bg-muted text-muted-foreground',
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

type AvatarBadgeProps = React.ComponentProps<'span'>;

function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
  return (
    <span
      className={cn(
        'absolute bottom-0 right-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none',
        'size-2.5 [&>svg]:size-2',
        className,
      )}
      data-slot="avatar-badge"
      {...props}
    />
  );
}

type AvatarGroupProps = React.ComponentProps<'div'>;

function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn(
        'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className,
      )}
      data-slot="avatar-group"
      {...props}
    />
  );
}

type AvatarGroupCountProps = React.ComponentProps<'div'>;

function AvatarGroupCount({ className, ...props }: AvatarGroupCountProps) {
  return (
    <div
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background',
        '[&>svg]:size-4',
        className,
      )}
      data-slot="avatar-group-count"
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  avatarVariants,
};
export type { AvatarProps };
