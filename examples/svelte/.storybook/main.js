const preprocess = require('svelte-preprocess');

module.exports = {
  framework: '@storybook/svelte',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    // On-demand store does not work for .svelte stories, only CSF.
    storyStoreV7: false,
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config;
  },
  svelteOptions: {
    preprocess: preprocess(),
  },
};
