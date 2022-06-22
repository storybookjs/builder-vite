import { withOverview } from 'bookcase-builder';

export default withOverview(__dirname)({
  framework: '@storybook/preact',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
});
