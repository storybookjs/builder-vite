import EnvVars from './EnvironmentVariables.vue';

export default {
  title: 'Environment Variables',
  component: EnvVars,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { EnvVars },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<env-vars v-bind="args" />',
});

export const Info = Template.bind({});
Info.args = {
  dynamic: import.meta.env.VITE_ENV_VAR,
};
