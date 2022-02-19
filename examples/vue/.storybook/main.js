const { plugins } = require('storybook-builder-vite-vue');

module.exports = {
  framework: '@storybook/vue3',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, options) {
    config.plugins = config.plugins.concat(await plugins(options))
    config.resolve.dedupe = ['@storybook/client-api', 'react'];
    // customize the Vite config here
    return config;
  },
};
