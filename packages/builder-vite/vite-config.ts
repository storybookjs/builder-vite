import * as path from 'path';
import fs from 'fs';
import { allowedEnvPrefix as envPrefix } from './envs';
import { TypescriptConfig } from '@storybook/core-common';
import { mockCoreJs } from './plugins/mock-core-js';
import { mdxPlugin, noFouc, injectExportOrderPlugin, codeGeneratorPlugin, sourceLoaderPlugin } from './plugins';

import type { Plugin, PluginOption, UserConfig } from 'vite';
import type { ExtendedOptions } from './types';

export type PluginConfigType = 'build' | 'development';

export function readPackageJson(): Record<string, any> | false {
  const packageJsonPath = path.resolve('package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(jsonContent);
}

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
    resolve:
      framework === 'vue3'
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
  const { framework, presets } = options;
  const svelteOptions: Record<string, any> = await presets.apply('svelteOptions', {}, options);

  const plugins: Plugin | PluginOption = [
    codeGeneratorPlugin(options),
    mockCoreJs(),
    sourceLoaderPlugin(options),
    mdxPlugin(),
    noFouc(),
    injectExportOrderPlugin,
  ];
  if (framework === 'vue' || framework === 'vue3') {
    try {
      const { default: vuePlugin } = await import('@vitejs/plugin-vue');
      plugins.push(vuePlugin());
      const { vueDocgen } = await import('./plugins/vue-docgen');
      plugins.push(vueDocgen());
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') {
        throw new Error(
          '@storybook/builder-vite requires @vitejs/plugin-vue to be installed ' +
            'when using @storybook/vue or @storybook/vue3.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }
  }
  if (framework === 'svelte') {
    try {
      const { svelte: sveltePlugin } = await import('@sveltejs/vite-plugin-svelte');

      // We need to create two separate svelte plugins, one for stories, and one for other svelte files
      // because stories.svelte files cannot be hot-module-reloaded.
      // Suggested in: https://github.com/sveltejs/vite-plugin-svelte/issues/321#issuecomment-1113205509

      // First, create an array containing user exclude patterns, to combine with ours.
      const userExclude = Array.isArray(svelteOptions?.exclude)
        ? svelteOptions?.exclude
        : svelteOptions?.exclude
        ? [svelteOptions?.exclude]
        : [];

      // These are the svelte stories we need to exclude from HMR
      const storyPatterns = ['**/*.story.svelte', '**/*.stories.svelte'];
      // Non-story svelte files
      plugins.push(sveltePlugin({ ...svelteOptions, exclude: [...userExclude, ...storyPatterns] }));
      // Svelte stories without HMR
      plugins.push({
        ...sveltePlugin({ ...svelteOptions, exclude: userExclude, include: storyPatterns, hot: false }),
        name: 'vite-plugin-svelte-stories',
      });
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') {
        throw new Error(
          '@storybook/builder-vite requires @sveltejs/vite-plugin-svelte to be installed' +
            ' when using @storybook/svelte.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }

    try {
      const { csfPlugin } = await import('./plugins/svelte/csf-plugin');
      plugins.push(csfPlugin(svelteOptions));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') {
        throw new Error(
          '@storybook/builder-vite requires @storybook/addon-svelte-csf to be installed when using @storybook/svelte.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }
  }

  if (framework === 'react') {
    const { default: viteReact } = await import('@vitejs/plugin-react');
    plugins.push(
      viteReact({
        // Do not treat story files as HMR boundaries, storybook itself needs to handle them.
        exclude: [/\.stories\.([tj])sx?$/, /node_modules/],
      })
    );

    const { reactDocgen, reactDocgenTypescriptOptions } = await presets.apply('typescript', {} as TypescriptConfig);

    let typescriptPresent;

    try {
      const pkgJson = readPackageJson();
      typescriptPresent = pkgJson && (pkgJson?.devDependencies?.typescript || pkgJson?.dependencies?.typescript);
    } catch (e) {
      typescriptPresent = false;
    }

    if (reactDocgen === 'react-docgen-typescript' && typescriptPresent) {
      plugins.push(require('@joshwooding/vite-plugin-react-docgen-typescript').default(reactDocgenTypescriptOptions));
    } else if (reactDocgen) {
      const { reactDocgen } = await import('./plugins/react/react-docgen');
      // Needs to run before the react plugin, so add to the front
      plugins.unshift(reactDocgen());
    }
  }

  if (framework === 'glimmerx') {
    const { default: glimmerxPlugin } = require('vite-plugin-glimmerx/index.cjs');
    plugins.push(glimmerxPlugin.default());
  }

  return plugins;
}
