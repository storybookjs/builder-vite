import { Page } from './Page';
import * as HeaderStories from './Header.stories';

export default {
  // This component uses autotitles with a configuration object
  // See https://storybook.js.org/docs/react/configure/overview#with-a-configuration-object
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
