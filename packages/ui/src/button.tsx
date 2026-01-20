import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cn } from './utils';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
} & AriaButtonProps;

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          destructive:
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
          ghost: 'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400',
          outline:
            'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400',
          primary:
            'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
          secondary:
            'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
        }[variant],
        {
          lg: 'h-12 px-6 text-base',
          md: 'h-10 px-4 text-sm',
          sm: 'h-8 px-3 text-sm',
        }[size],
        className,
      )}
      {...props}
    />
  );
}
