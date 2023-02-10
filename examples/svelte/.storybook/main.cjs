const path = require('node:path');

module.exports = {
  framework: '@storybook/svelte',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    // On-demand store does not work for .svelte stories, only CSF.
    storyStoreV7: false,
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
  // @ts-ignore
  svelteOptions: {
    // Possible with @sveltejs/vite-plugin-svelte version 1.0.0-next.43 or higher.
    // Focus a story iframe and press cmd+shift (mac) or ctrl+shift (windows) to activate.
    experimental: { inspector: true },
  },
};
