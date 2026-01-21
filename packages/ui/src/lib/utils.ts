import { composeRenderProps } from 'react-aria-components';
import { type ClassNameValue, twMerge } from 'tailwind-merge';

type ClassNameRender<T> = string | ((v: T) => string) | undefined;
type ChildrenRender<T> = React.ReactNode | ((props: T) => React.ReactNode);

type ClassNameCallback<T> = (renderProps: T) => string;
type ChildrenCallback<T> = (
  renderProps: T,
  children: React.ReactNode,
) => React.ReactNode;

/**
 * RAC-aware utility for composing render props.
 * Use for React Aria Components where className/children can be functions.
 *
 * @example Static classes with RAC className prop
 * cx('class1', 'class2', className)
 *
 * @example ClassName with renderProps (1 param callback)
 * cx((renderProps) => variantFn({ ...renderProps, variant }), className)
 *
 * @example Children with renderProps (2 param callback)
 * cx(({ isSelected }, children) => (
 *   <>
 *     {isSelected && <CheckIcon />}
 *     {children}
 *   </>
 * ), children)
 */
// Overload: static with RAC className prop
export function cx<T = unknown>(
  ...args: [...ClassNameValue[], ClassNameRender<T>]
): string | ((v: T) => string);

// Overload: className callback form (1 param)
export function cx<T = unknown>(
  callback: ClassNameCallback<T>,
  className?: ClassNameRender<T>,
): string | ((v: T) => string);

// Overload: children callback form (2 params)
export function cx<T = unknown>(
  callback: ChildrenCallback<T>,
  children?: ChildrenRender<T>,
): React.ReactNode | ((props: T) => React.ReactNode);

// Implementation
export function cx<T = unknown>(
  ...args:
    | [...ClassNameValue[], ClassNameRender<T>]
    | [ClassNameCallback<T>, ClassNameRender<T>?]
    | [ChildrenCallback<T>, ChildrenRender<T>?]
):
  | string
  | ((v: T) => string)
  | React.ReactNode
  | ((props: T) => React.ReactNode) {
  // Callback form: cx(callback, prop)
  if (
    (args.length === 1 || args.length === 2) &&
    typeof args[0] === 'function'
  ) {
    const callback = args[0] as ClassNameCallback<T> | ChildrenCallback<T>;
    const prop = args[1];

    // Detect mode by callback arity:
    // - 1 param = className mode (uses twMerge)
    // - 2 params = children mode (passthrough)
    if (callback.length === 2) {
      // Children mode
      return composeRenderProps(
        prop as ChildrenRender<T>,
        (resolvedChildren, renderProps) =>
          (callback as ChildrenCallback<T>)(renderProps, resolvedChildren),
      );
    }

    // ClassName mode with callback
    return composeRenderProps(prop as ClassNameRender<T>, (c, renderProps) =>
      twMerge((callback as ClassNameCallback<T>)(renderProps), c),
    );
  }

  // Static form: cx('class1', 'class2', className)
  const resolvedArgs = args as (ClassNameValue | ClassNameRender<T>)[];
  const className = resolvedArgs.pop() as ClassNameRender<T>;
  const tailwinds = resolvedArgs as ClassNameValue[];
  const fixed = twMerge(...tailwinds);

  return composeRenderProps(className, (c) => twMerge(fixed, c));
}

// Re-export cn from tailwind-variants for simple class merging
export { cn } from 'tailwind-variants';
