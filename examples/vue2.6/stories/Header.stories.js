import MyHeader from './Header.vue';

export default {
  title: 'Example/Header',
  component: MyHeader,
};

const Template = (args, { argTypes }) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyHeader },
  props: Object.keys(argTypes),
  // Then, the spread values can be accessed directly in the template
  template: '<my-header v-bind="$props" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
};
