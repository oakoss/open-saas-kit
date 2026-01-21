'use client';

import {
  Button,
  type ButtonProps,
  Disclosure as DisclosurePrimitive,
  DisclosurePanel as DisclosurePanelPrimitive,
  type DisclosurePanelProps,
  type DisclosureProps,
} from 'react-aria-components';

function Collapsible({ ...props }: DisclosureProps) {
  return <DisclosurePrimitive data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({ ...props }: ButtonProps) {
  return <Button data-slot="collapsible-trigger" slot="trigger" {...props} />;
}

function CollapsibleContent({ ...props }: DisclosurePanelProps) {
  return (
    <DisclosurePanelPrimitive data-slot="collapsible-content" {...props} />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
