const { plugins } = require('storybook-builder-vite-svelte');
const preprocess = require('svelte-preprocess');

module.exports = {
  framework: '@storybook/svelte',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, options) {
    config.plugins = config.plugins.concat(await plugins(options));
    // customize the Vite config here
    return config;
  },
  svelteOptions: {
    preprocess: preprocess(),
  },
};
