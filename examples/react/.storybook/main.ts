import type { StorybookViteConfig } from '@storybook/builder-vite';
import { defineManagerConfig, definePreviewConfig } from '../../../scripts/build-utils';
import path from 'path';

const isPreview = process.env.IS_PREVIEW === 'true';

const config: StorybookViteConfig = {
  framework: '@storybook/react',
  stories: ['../stories/**/*stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
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
};

export default config;
