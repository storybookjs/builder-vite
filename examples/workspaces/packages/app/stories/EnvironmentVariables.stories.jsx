import { EnvironmentVariables } from './EnvironmentVariables';

export default {
  // This title overrides the autotitle defined in the configuration object in main.js
  title: 'Environment Variables',
  component: EnvironmentVariables,
};

export const Info = () => <EnvironmentVariables />;
