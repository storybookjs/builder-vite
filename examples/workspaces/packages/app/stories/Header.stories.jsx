import { Header } from './Header';

export default {
  // This component uses autotitles with a configuration object
  // See https://storybook.js.org/docs/react/configure/overview#with-a-configuration-object
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
