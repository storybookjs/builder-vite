import { ComponentMeta } from '@storybook/react';
import { EnvironmentVariables } from './EnvironmentVariables';

const meta: ComponentMeta<typeof EnvironmentVariables> = {
  title: 'Environment Variables',
  component: EnvironmentVariables,
};
export default meta;

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
