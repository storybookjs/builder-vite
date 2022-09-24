import MyPage from './Page.vue';
import * as HeaderStories from './Header.stories';

export default {
  title: 'Example/Page',
  component: MyPage,
};

const Template = (args, { argTypes }) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyPage },
  props: Object.keys(argTypes),
  // Then, those values can be accessed directly in the template
  template: '<my-page v-bind="$props" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
