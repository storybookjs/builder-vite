import { ComponentMeta } from '@storybook/react';
import { EnvironmentVariables } from './EnvironmentVariables';

const meta: ComponentMeta<typeof EnvironmentVariables> = {
  title: 'Environment Variables',
  component: EnvironmentVariables,
};
export default meta;

export const Info = () => <EnvironmentVariables />;
