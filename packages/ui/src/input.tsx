import {
  FieldError,
  Input as AriaInput,
  Label,
  Text,
  TextField,
  type TextFieldProps,
} from 'react-aria-components';

import { cn } from './utils';

export type InputProps = {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
} & TextFieldProps;

export function Input({
  label,
  description,
  errorMessage,
  className,
  ...props
}: InputProps) {
  return (
    <TextField className={cn('flex flex-col gap-1', className)} {...props}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}
      <AriaInput
        className={cn(
          'h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'invalid:border-red-500 invalid:focus:ring-red-500/20',
        )}
      />
      {description && (
        <Text className="text-xs text-gray-500" slot="description">
          {description}
        </Text>
      )}
      <FieldError className="text-xs text-red-600">{errorMessage}</FieldError>
    </TextField>
  );
}
