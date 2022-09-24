const { resolve } = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  framework: '@storybook/vue',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    previewMdx2: true,
  },
  async viteFinal(config, { configType }) {
    // Demonstrates use of mergeConfig and resolve.alias as an array
    return mergeConfig(config, {
      resolve: {
        alias: [{ find: '@assets', replacement: resolve(__dirname, '..', 'stories', 'assets') }],
      },
    });
  },
};
