import EnvironmentVariables from './EnvironmentVariables.vue';

export default {
  title: 'Environment Variables',
  component: EnvironmentVariables
};

export const Info = () => ({
  components: { EnvironmentVariables },
  template: '<EnvironmentVariables />',
});
