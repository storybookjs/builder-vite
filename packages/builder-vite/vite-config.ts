import * as path from 'path';
import fs from 'fs';
import { Plugin } from 'vite';
import { TypescriptConfig } from '@storybook/core-common';
import semver from '@storybook/semver';

import { allowedEnvPrefix as envPrefix } from './envs';
import { codeGeneratorPlugin } from './code-generator-plugin';
import { injectExportOrderPlugin } from './inject-export-order-plugin';
import { mdxPlugin } from './plugins/mdx-plugin';
import { noFouc } from './plugins/no-fouc';
import { sourceLoaderPlugin } from './source-loader-plugin';

import type { UserConfig } from 'vite';
import type { ExtendedOptions } from './types';

export type PluginConfigType = 'build' | 'development';

export function readPackageJson(dir: string = process.cwd()): Record<string, any> | false {
  const packageJsonPath = path.resolve(dir, 'package.json');
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
  const vuePath = framework === 'vue3' ? 'vue/dist/vue.esm-bundler.js' : 'vue/dist/vue.esm.js';

  return {
    configFile: false,
    root: path.resolve(options.configDir, '..'),
    cacheDir: 'node_modules/.vite-storybook',
    envPrefix,
    define: {},
    resolve: /^vue3?$/.test(framework)
      ? {
          alias: {
            vue: vuePath,
          },
        }
      : {},
    plugins: await pluginConfig(options, _type),
  };
}

export async function pluginConfig(options: ExtendedOptions, _type: PluginConfigType) {
  const { framework, presets } = options;
  const svelteOptions: Record<string, any> = await presets.apply('svelteOptions', {}, options);
  const root = path.resolve(options.configDir, '..');

  const plugins = [
    codeGeneratorPlugin(options),
    sourceLoaderPlugin(options),
    mdxPlugin(options),
    noFouc(),
    injectExportOrderPlugin,
    {
      name: 'vite-plugin-storybook-allow',
      enforce: 'post',
      config(config) {
        // if there is no allow list then Vite allows anything in the root directory
        // if there is an allow list then Vite allows anything in the listed directories
        // add the .storybook directory only if there's an allow list so that we don't end up
        // disallowing the root directory unless it's already disallowed
        if (config?.server?.fs?.allow) {
          config.server.fs.allow.push('.storybook');
        }
      },
    },
  ] as Plugin[];

  if (framework === 'vue') {
    const pkgJson = readPackageJson(root);
    const vueVer: string | false | undefined = pkgJson && (pkgJson?.dependencies?.vue ?? pkgJson?.devDependencies?.vue);
    // Default to 2.7, but check if package.json has a version that is less than 2.7
    const is26 = vueVer && semver.gtr('2.7.0', vueVer);
    try {
      const vuePlugin = is26 ? require('vite-plugin-vue2').createVuePlugin : require('@vitejs/plugin-vue2');
      plugins.push(vuePlugin());
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        throw new Error(`
          @storybook/builder-vite requires ${
            is26 ? 'vite-plugin-vue2' : '@vitejs/plugin-vue2'
          } to be installed when using @storybook/vue.
          Please install it and start storybook again.
        `);
      }
      throw err;
    }
    try {
      const { vueDocgen } = await import('./plugins/vue-docgen');
      plugins.push(vueDocgen(2));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        throw new Error(
          '@storybook/builder-vite requires vue-docgen-api to be installed ' +
            'when using @storybook/vue.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }
  }

  if (framework === 'vue3') {
    try {
      const vuePlugin = require('@vitejs/plugin-vue');
      plugins.push(vuePlugin());
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        throw new Error(`
          @storybook/builder-vite requires @vitejs/plugin-vue to be installed when using @storybook/vue3.
          Please install it and start storybook again.
        `);
      }
      throw err;
    }

    try {
      const { vueDocgen } = await import('./plugins/vue-docgen');
      plugins.push(vueDocgen(3));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        throw new Error(
          '@storybook/builder-vite requires vue-docgen-api to be installed ' +
            'when using @storybook/vue3.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }
  }

  if (framework === 'svelte') {
    try {
      const sveltePlugin = require('@sveltejs/vite-plugin-svelte').svelte;

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
      // Starting in 1.0.0-next.42, svelte.config.js is included by default.
      // We disable that, but allow it to be overridden in svelteOptions
      plugins.push(sveltePlugin({ ...svelteOptions, exclude: [...userExclude, ...storyPatterns] }));
      // Svelte stories without HMR
      const storySveltePlugin = sveltePlugin({
        ...svelteOptions,
        exclude: userExclude,
        include: storyPatterns,
        hot: false,
      });
      plugins.push({
        // Starting in 1.0.0-next.43, the plugin function returns an array of plugins.  We only want the first one here.
        ...(Array.isArray(storySveltePlugin) ? storySveltePlugin[0] : storySveltePlugin),
        name: 'vite-plugin-svelte-stories',
      });
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        throw new Error(
          '@storybook/builder-vite requires @sveltejs/vite-plugin-svelte to be installed' +
            ' when using @storybook/svelte.' +
            '  Please install it and start storybook again.'
        );
      }
      throw err;
    }

    const { loadSvelteConfig } = require('@sveltejs/vite-plugin-svelte');
    const config = { ...loadSvelteConfig(), ...svelteOptions };

    try {
      const csfPlugin = require('./svelte/csf-plugin').default;
      plugins.push(csfPlugin(config));
    } catch (err) {
      // Not all projects use `.stories.svelte` for stories, and by default 6.5+ does not auto-install @storybook/addon-svelte-csf.
      // If it's any other kind of error, re-throw.
      if ((err as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') {
        throw err;
      }
    }

    const { svelteDocgen } = await import('./plugins/svelte-docgen');
    plugins.push(svelteDocgen(config));
  }

  if (framework === 'preact') {
    plugins.push(require('@preact/preset-vite').default());
  }

  if (framework === 'react') {
    // First, look for plugin-react
    try {
      const reactPlugin = require('@vitejs/plugin-react');
      plugins.push(reactPlugin());
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
        // Next, check if plugin-react-swc is installed, and if so, use that
        try {
          const reactSWCPlugin = require('@vitejs/plugin-react-swc');
          plugins.push(reactSWCPlugin());
        } catch (err2) {
          if ((err2 as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND') {
            throw new Error(
              '@storybook/builder-vite requires @vitejs/plugin-react or @vitejs/plugin-react-swc ' +
                'to be installed when using @storybook/react. \n' +
                'Please install one of them and start storybook again.'
            );
          }
          throw err;
        }
      }
    }

    const { reactDocgen: reactDocgenOption, reactDocgenTypescriptOptions } = await presets.apply(
      'typescript',
      {} as TypescriptConfig
    );

    let typescriptPresent;

    try {
      require.resolve('typescript');
      typescriptPresent = true;
    } catch (e) {
      typescriptPresent = false;
    }

    if (reactDocgenOption === 'react-docgen-typescript' && typescriptPresent) {
      plugins.push(
        require('@joshwooding/vite-plugin-react-docgen-typescript')({
          ...reactDocgenTypescriptOptions,
          // We *need* this set so that RDT returns default values in the same format as react-docgen
          savePropValueAsString: true,
        })
      );
    }

    // Add react-docgen so long as the option is not false
    if (typeof reactDocgenOption === 'string') {
      const { reactDocgen } = await import('./plugins/react-docgen');
      // Needs to run before the react plugin, so add to the front
      plugins.unshift(
        // If react-docgen is specified, use it for everything, otherwise only use it for non-typescript files
        reactDocgen({ include: reactDocgenOption === 'react-docgen' ? /\.(mjs|tsx?|jsx?)$/ : /\.(mjs|jsx?)$/ })
      );
    }
  }

  if (framework === 'glimmerx') {
    const plugin = require('vite-plugin-glimmerx/index.cjs');
    plugins.push(plugin.default());
  }

  return plugins;
}
