import EnvVars from './EnvironmentVariables.vue';

export default {
  title: 'Environment Variables',
  component: EnvVars,
};

const Template = (args, { argTypes }) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { EnvVars },
  props: Object.keys(argTypes),
  template: '<env-vars v-bind="$props" />',
});

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
