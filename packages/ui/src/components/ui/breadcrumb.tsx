'use client';

import { RiArrowRightSLine, RiMoreLine } from '@remixicon/react';
import * as React from 'react';
import {
  Breadcrumb as BreadcrumbPrimitive,
  type BreadcrumbProps,
  Breadcrumbs as BreadcrumbsPrimitive,
  type BreadcrumbsProps,
  Link,
  type LinkProps,
} from 'react-aria-components';

import { cn } from '../../lib/utils';

function Breadcrumb({ className, ...props }: BreadcrumbsProps<object>) {
  return (
    <BreadcrumbsPrimitive
      className={cn(
        'text-muted-foreground gap-1.5 text-sm flex flex-wrap items-center wrap-break-word',
        className,
      )}
      data-slot="breadcrumb"
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      className={cn(
        'text-muted-foreground gap-1.5 text-sm flex flex-wrap items-center wrap-break-word',
        className,
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: BreadcrumbProps) {
  return (
    <BreadcrumbPrimitive
      className={cn('gap-1 inline-flex items-center', className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

function BreadcrumbLink({ className, ...props }: LinkProps) {
  return (
    <Link
      className={cn('hover:text-foreground transition-colors', className)}
      data-slot="breadcrumb-link"
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={cn('text-foreground font-normal', className)}
      data-slot="breadcrumb-page"
      role="link"
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <RiArrowRightSLine />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-5 [&>svg]:size-4 flex items-center justify-center',
        className,
      )}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <RiMoreLine />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
