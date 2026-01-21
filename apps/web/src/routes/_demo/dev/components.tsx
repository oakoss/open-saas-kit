'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@oakoss/ui';
import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createFileRoute('/_demo/dev/components')({
  component: ComponentsDemo,
});

function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function ComponentsDemo() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Components</h1>
        <p className="text-muted-foreground mt-2">
          Testing migrated React Aria Components
        </p>
      </div>

      <Section title="Button">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button aria-label="Add" size="icon">
            +
          </Button>
        </div>
        <div className="flex gap-2">
          <Button isDisabled>Disabled</Button>
          <Button isPending>Loading...</Button>
        </div>
      </Section>

      <Section title="Checkbox">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox defaultSelected id="checked" />
          <Label htmlFor="checked">Pre-checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox isDisabled id="disabled" />
          <Label htmlFor="disabled">Disabled</Label>
        </div>
      </Section>

      <Section title="CheckboxGroup">
        <p className="text-muted-foreground text-sm">Select frameworks</p>
        <CheckboxGroup defaultValue={['react']}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="react" value="react" />
              <Label htmlFor="react">React</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="vue" value="vue" />
              <Label htmlFor="vue">Vue</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="svelte" value="svelte" />
              <Label htmlFor="svelte">Svelte</Label>
            </div>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="Switch">
        <div className="flex items-center gap-2">
          <Switch id="airplane" />
          <Label htmlFor="airplane">Airplane Mode</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch defaultSelected id="notifications" />
          <Label htmlFor="notifications">Notifications (on)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch isDisabled id="disabled-switch" />
          <Label htmlFor="disabled-switch">Disabled</Label>
        </div>
      </Section>

      <Section title="RadioGroup">
        <p className="text-muted-foreground text-sm">Select density</p>
        <RadioGroup defaultValue="comfortable">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="default" value="default" />
              <Label htmlFor="default">Default</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="comfortable" value="comfortable" />
              <Label htmlFor="comfortable">Comfortable</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="compact" value="compact" />
              <Label htmlFor="compact">Compact</Label>
            </div>
          </div>
        </RadioGroup>
      </Section>

      <Section title="Toggle">
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold">B</Toggle>
          <Toggle defaultSelected aria-label="Toggle italic">
            I
          </Toggle>
          <Toggle aria-label="Toggle underline" variant="outline">
            U
          </Toggle>
        </div>
      </Section>

      <Section title="ToggleGroup">
        <ToggleGroup defaultSelectedKeys={['center']} selectionMode="single">
          <ToggleGroupItem aria-label="Align left" id="left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" id="center">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" id="right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          defaultSelectedKeys={['bold', 'italic']}
          selectionMode="multiple"
        >
          <ToggleGroupItem aria-label="Toggle bold" id="bold">
            B
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle italic" id="italic">
            I
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle underline" id="underline">
            U
          </ToggleGroupItem>
        </ToggleGroup>
      </Section>

      <Section title="Separator">
        <div>
          <p>Content above</p>
          <Separator className="my-4" />
          <p>Content below</p>
        </div>
        <div className="flex h-8 items-center gap-4">
          <span>Left</span>
          <Separator orientation="vertical" />
          <span>Middle</span>
          <Separator orientation="vertical" />
          <span>Right</span>
        </div>
      </Section>

      <Section title="Tabs">
        <CardDescription>Default variant</CardDescription>
        <Tabs defaultSelectedKey="account">
          <TabsList>
            <TabsTrigger id="account">Account</TabsTrigger>
            <TabsTrigger id="password">Password</TabsTrigger>
            <TabsTrigger id="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent id="account">
            <p className="text-muted-foreground p-4">
              Manage your account settings here.
            </p>
          </TabsContent>
          <TabsContent id="password">
            <p className="text-muted-foreground p-4">
              Change your password here.
            </p>
          </TabsContent>
          <TabsContent id="settings">
            <p className="text-muted-foreground p-4">
              Customize your preferences.
            </p>
          </TabsContent>
        </Tabs>

        <CardDescription className="mt-4">Line variant</CardDescription>
        <Tabs defaultSelectedKey="overview">
          <TabsList variant="line">
            <TabsTrigger id="overview">Overview</TabsTrigger>
            <TabsTrigger id="analytics">Analytics</TabsTrigger>
            <TabsTrigger id="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent id="overview">
            <p className="text-muted-foreground p-4">Overview content</p>
          </TabsContent>
          <TabsContent id="analytics">
            <p className="text-muted-foreground p-4">Analytics content</p>
          </TabsContent>
          <TabsContent id="reports">
            <p className="text-muted-foreground p-4">Reports content</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Accordion">
        <Accordion>
          <AccordionItem id="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles using Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It has smooth expand/collapse animations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Collapsible">
        <Collapsible
          className="w-full"
          isExpanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              @tanstack/react-router
            </span>
            <CollapsibleTrigger>
              <Button size="sm" variant="ghost">
                {isExpanded ? 'Hide' : 'Show'} details
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="bg-muted rounded-md px-4 py-2 font-mono text-sm">
              @tanstack/react-start
            </div>
            <div className="bg-muted rounded-md px-4 py-2 font-mono text-sm">
              @tanstack/react-query
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dev/components">Components</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </Section>

      <Section title="Input">
        <div className="grid gap-4">
          <Input placeholder="Default input" />
          <Input disabled placeholder="Disabled input" />
          <div className="flex items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter email" type="email" />
          </div>
        </div>
      </Section>
    </div>
  );
}
