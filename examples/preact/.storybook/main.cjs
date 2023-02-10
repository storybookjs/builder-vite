const path = require('node:path');

module.exports = {
  framework: '@storybook/preact',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // because rollup does not respect NODE_PATH, and we have a funky example setup that needs it
    config.build.rollupOptions = {
      plugins: {
        resolveId: function (code) {
          if (code === 'react') return path.resolve(require.resolve('react'));
          if (code === 'preact/compat') return path.resolve(require.resolve('preact/compat'));
        },
      },
    };
    return config;
  },
};
