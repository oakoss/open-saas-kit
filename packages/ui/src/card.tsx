import type { ReactNode } from 'react';

import { cn } from './utils';

export type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

export type CardHeaderProps = {
  className?: string;
  children: ReactNode;
};

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
}

export type CardTitleProps = {
  className?: string;
  children: ReactNode;
};

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export type CardDescriptionProps = {
  className?: string;
  children: ReactNode;
};

export function CardDescription({ className, children }: CardDescriptionProps) {
  return <p className={cn('text-sm text-gray-500', className)}>{children}</p>;
}

export type CardContentProps = {
  className?: string;
  children: ReactNode;
};

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

export type CardFooterProps = {
  className?: string;
  children: ReactNode;
};

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>
      {children}
    </div>
  );
}
