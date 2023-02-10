const path = require('node:path');
const { mergeConfig } = require('vite');
const postcssLit = require('rollup-plugin-postcss-lit');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  framework: '@storybook/web-components',
  features: {
    buildStoriesJson: true,
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      // prettier-ignore
      plugins: [postcssLit({ include: ['**/*.scss', '**/*.scss\?*'] })],
      // because rollup does not respect NODE_PATH, and we have a funky example setup that needs it
      build: {
        rollupOptions: {
          plugins: {
            resolveId: function (code) {
              if (code === 'react') return path.resolve(require.resolve('react'));
            },
          },
        },
      },
    });
  },
};
