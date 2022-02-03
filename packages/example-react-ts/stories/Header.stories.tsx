import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from './Header';

const meta: ComponentMeta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
};
export default meta;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
