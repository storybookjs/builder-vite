import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  title: 'Environment Variables',
  component: EnvironmentVariables,
};

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
