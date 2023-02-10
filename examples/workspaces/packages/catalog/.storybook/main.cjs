const path = require('node:path');

module.exports = {
  framework: '@storybook/react',
  stories: [
    { directory: '../../app/stories', files: '*.stories.mdx' },
    { directory: '../../app/stories', files: '*.stories.jsx', titlePrefix: 'Example' },
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    // because rollup does not respect NODE_PATH, and we have a funky example setup that needs it
    config.build.rollupOptions = {
      plugins: {
        resolveId: function (code) {
          if (code === 'react') return path.resolve(require.resolve('react'));
        },
      },
    };
    return config;
  },
};
