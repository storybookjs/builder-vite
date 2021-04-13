import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from './button';

export default {
    component: Button,
    title: 'Examples / Button',
    argTypes: { onClick: { action: 'click ' } },
} as Meta;

export const WithArgs = (args: any) => <Button {...args} />;
WithArgs.args = { label: 'With args' };
export const Basic = () => <Button label="Click me" />;
export const Advanced = () => <Button label="Advanced" />;
