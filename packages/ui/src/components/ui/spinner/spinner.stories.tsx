import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './spinner';

const meta = {
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    className: 'size-8',
  },
};

export const CustomColor: Story = {
  args: {
    className: 'size-6 text-primary',
  },
};
