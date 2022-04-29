import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  // This component uses auto-title
  component: EnvironmentVariables,
};

const Template = (args) => <EnvironmentVariables {...args} />;

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
