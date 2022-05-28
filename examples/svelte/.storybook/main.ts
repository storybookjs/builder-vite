import type { StorybookViteConfig } from '@storybook/builder-vite';
import { defineManagerConfig, definePreviewConfig } from '../../../scripts/build-utils';
import path from 'path';

const preprocess = require('svelte-preprocess');

const isPreview = process.env.IS_PREVIEW === 'true';

const config: StorybookViteConfig = {
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
    buildStoriesJson: isPreview,
  },
  // @ts-ignore
  managerWebpack(config) {
    if (isPreview) {
      return defineManagerConfig(path.resolve(__dirname, '../'), config);
    }
    return config;
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    if (isPreview) {
      return definePreviewConfig(path.resolve(__dirname, '../'), config);
    }
    return config;
  },
  // @ts-ignore
  svelteOptions: {
    preprocess: preprocess(),
    // Possible with @sveltejs/vite-plugin-svelte version 1.0.0-next.43 or higher.
    // Focus a story iframe and press cmd+shift (mac) or ctrl+shift (windows) to activate.
    experimental: { inspector: true },
  },
};

export default config;
