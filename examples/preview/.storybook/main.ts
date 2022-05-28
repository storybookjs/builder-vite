import type { StorybookViteConfig } from '@storybook/builder-vite';
import path from 'path';
import { defineManagerConfig, definePreviewConfig, getPackagesInfo, PREVIEW_BASE } from '../../../scripts/build-utils';
import pkg from '../package.json';

const refs = getPackagesInfo()
  // @ts-ignore
  .filter((item) => !!item.packageJson.pages && item.packageJson.name !== pkg.name)
  .reduce<
    Record<
      string,
      {
        title: string;
        url: string;
      }
    >
  >((prev, current) => {
    const baseName = current?.path?.split('/').pop();
    if (!baseName) {
      return prev;
    }
    prev[baseName] = {
      title: baseName,
      url: path.join(PREVIEW_BASE, baseName),
    };
    return prev;
  }, {});

const config: StorybookViteConfig = {
  framework: '@storybook/react',
  stories: ['../stories/**/*stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  refs,
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: false,
    buildStoriesJson: true,
  },
  // @ts-ignore
  managerWebpack(config) {
    return defineManagerConfig(path.resolve(__dirname, '../'), config);
  },
  async viteFinal(config, { configType }) {
    return definePreviewConfig(path.resolve(__dirname, '../'), config);
  },
};

export default config;
