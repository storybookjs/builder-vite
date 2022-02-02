import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: ComponentMeta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
};
export default meta;

export const Primary: ComponentStoryObj<typeof Button> = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Button',
  },
};

export const Large: ComponentStoryObj<typeof Button> = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: ComponentStoryObj<typeof Button> = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
