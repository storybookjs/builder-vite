const { plugins } = require('storybook-builder-vite-react');

module.exports = {
  framework: '@storybook/react',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, options) {

    config.plugins = config.plugins.concat(await plugins(options))
    // customize the Vite config here
    return config;
  },
};
