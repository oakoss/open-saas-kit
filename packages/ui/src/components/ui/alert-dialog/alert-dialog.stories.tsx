import { RiDeleteBinLine, RiErrorWarningLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';

import { Button } from '../button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

const meta = {
  args: {
    children: null,
  },
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/AlertDialog',
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Open Dialog' });
    await userEvent.click(trigger);
  },
  render: () => (
    <AlertDialog>
      <Button slot="trigger" variant="outline">
        Open Dialog
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMedia: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Delete Account' });
    await userEvent.click(trigger);
  },
  render: () => (
    <AlertDialog>
      <Button slot="trigger" variant="destructive">
        Delete Account
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiDeleteBinLine className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your account? All of your data will
            be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const SmallSize: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Confirm Action' });
    await userEvent.click(trigger);
  },
  render: () => (
    <AlertDialog>
      <Button slot="trigger" variant="outline">
        Confirm Action
      </Button>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <RiErrorWarningLine />
          </AlertDialogMedia>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DestructiveAction: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Remove Item' });
    await userEvent.click(trigger);
  },
  render: () => (
    <AlertDialog>
      <Button slot="trigger" variant="destructive">
        Remove Item
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Item</AlertDialogTitle>
          <AlertDialogDescription>
            This item will be removed from your collection. You can add it back
            later if needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Item</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithOverlay: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Open with Overlay' });
    await userEvent.click(trigger);
  },
  render: () => (
    <AlertDialog>
      <Button slot="trigger" variant="outline">
        Open with Overlay
      </Button>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Overlay Example</AlertDialogTitle>
            <AlertDialogDescription>
              This dialog uses a separate overlay component.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  ),
};

export const WithTrigger: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Custom Trigger' });
    await userEvent.click(trigger);
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Custom Trigger
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Custom Trigger</AlertDialogTitle>
          <AlertDialogDescription>
            This dialog uses the AlertDialogTrigger component directly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
