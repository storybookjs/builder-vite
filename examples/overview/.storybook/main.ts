import { getRefs, withOverview } from 'bookcase-builder';

export default withOverview(__dirname)({
  stories: ['../stories/**/*stories.mdx'],
  addons: [{
    name: '@storybook/addon-essentials',
    options: {
      "addon-actions": false,
    }
  }],
  refs: getRefs(),
  core: {
    builder: '@storybook/builder-vite',
  }
});
