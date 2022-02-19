import * as path from 'path';
import { Plugin } from 'vite';
import { allowedEnvPrefix as envPrefix } from './envs';
import { mockCoreJs } from './mock-core-js';
import { codeGeneratorPlugin } from './code-generator-plugin';
import { injectExportOrderPlugin } from './inject-export-order-plugin';
import { mdxPlugin } from './mdx-plugin';
import { sourceLoaderPlugin } from './source-loader-plugin';

import type { UserConfig } from 'vite';
import type { ExtendedOptions } from './types';

export type PluginConfigType = 'build' | 'development';

// Vite config that is common to development and production mode
export async function commonConfig(
  options: ExtendedOptions,
  _type: PluginConfigType
): Promise<UserConfig & { configFile: false; root: string }> {
  const { framework } = options;
  return {
    configFile: false,
    root: path.resolve(options.configDir, '..'),
    cacheDir: 'node_modules/.vite-storybook',
    envPrefix,
    define: {},
    resolve:  framework === 'vue3'
      ? {
        alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
        },
      }
      : {},
    plugins: await pluginConfig(options, _type),
  };
}

export async function pluginConfig(options: ExtendedOptions, _type: PluginConfigType) {
  return [
    codeGeneratorPlugin(options),
    mockCoreJs(),
    sourceLoaderPlugin(),
    mdxPlugin(),
    injectExportOrderPlugin,
  ] as Plugin[];

}
