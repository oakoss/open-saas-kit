'use client';

import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import * as React from 'react';
import {
  Button,
  Disclosure as DisclosurePrimitive,
  DisclosureGroup as DisclosureGroupPrimitive,
  type DisclosureGroupProps,
  DisclosurePanel as DisclosurePanelPrimitive,
  type DisclosurePanelProps,
  type DisclosureProps,
  Heading,
} from 'react-aria-components';

import { cn } from '../../lib/utils';

function Accordion({ className, ...props }: DisclosureGroupProps) {
  return (
    <DisclosureGroupPrimitive
      className={cn('flex w-full flex-col', className)}
      data-slot="accordion"
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: DisclosureProps) {
  return (
    <DisclosurePrimitive
      className={cn('group/accordion-item not-last:border-b', className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

type AccordionTriggerProps = {
  children?: React.ReactNode;
  className?: string;
};

function AccordionTrigger({ className, children }: AccordionTriggerProps) {
  return (
    <Heading className="flex">
      <Button
        className={cn(
          'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-lg py-2.5 text-left text-sm font-medium hover:underline focus-visible:ring-[3px] **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        data-slot="accordion-trigger"
        slot="trigger"
      >
        {children}
        <RiArrowDownSLine
          className="pointer-events-none shrink-0 group-data-expanded/accordion-item:hidden"
          data-slot="accordion-trigger-icon"
        />
        <RiArrowUpSLine
          className="pointer-events-none hidden shrink-0 group-data-expanded/accordion-item:inline"
          data-slot="accordion-trigger-icon"
        />
      </Button>
    </Heading>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: DisclosurePanelProps) {
  return (
    <DisclosurePanelPrimitive
      className="data-expanded:animate-accordion-down text-sm overflow-hidden"
      data-slot="accordion-content"
      {...props}
    >
      <div
        className={cn(
          'pt-0 pb-2.5 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
          className,
        )}
      >
        {children}
      </div>
    </DisclosurePanelPrimitive>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
