import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import { ComponentMeta, ComponentStory } from '@storybook/react';

const meta: ComponentMeta<typeof Page> = {
  title: 'Example/Page',
  component: Page,
};
export default meta;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
