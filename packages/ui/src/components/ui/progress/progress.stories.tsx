import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Progress,
  ProgressHeader,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from './progress';

const meta = {
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Progress',
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Progress aria-label="Loading progress" className="w-64" value={60}>
      <ProgressTrack />
    </Progress>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Progress className="w-64" value={45}>
      <ProgressHeader>
        <ProgressLabel>Uploading...</ProgressLabel>
        <ProgressValue />
      </ProgressHeader>
      <ProgressTrack />
    </Progress>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Progress isIndeterminate className="w-64">
      <ProgressHeader>
        <ProgressLabel>Loading...</ProgressLabel>
      </ProgressHeader>
      <ProgressTrack />
    </Progress>
  ),
};

export const Complete: Story = {
  render: () => (
    <Progress className="w-64" value={100}>
      <ProgressHeader>
        <ProgressLabel>Complete</ProgressLabel>
        <ProgressValue />
      </ProgressHeader>
      <ProgressTrack />
    </Progress>
  ),
};

export const CustomValueLabel: Story = {
  render: () => (
    <Progress className="w-64" value={3} valueLabel="3 of 10 tasks">
      <ProgressHeader>
        <ProgressLabel>Tasks</ProgressLabel>
        <ProgressValue />
      </ProgressHeader>
      <ProgressTrack />
    </Progress>
  ),
};
