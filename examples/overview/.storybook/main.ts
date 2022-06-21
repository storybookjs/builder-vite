import { getRefs, withOverview } from 'bookcase-builder';

export default withOverview(__dirname)({
  stories: ['../stories/**/*stories.mdx'],
  addons: ['@storybook/addon-essentials'],
  refs: getRefs(),
  core: {
    builder: '@storybook/builder-vite',
  }
});
