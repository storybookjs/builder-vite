import type { Server } from 'node:http';
import type { UserConfig as ViteConfig, Plugin as VitePlugin, PluginOption } from 'vite';
import { mergeConfig } from 'vite';
import { stringifyProcessEnvs } from '../envs';
import type { ExtendedOptions, EnvsRaw } from '../types';

const reactPlugins = ['vite:react-babel', 'vite:react-refresh', 'vite:react-jsx'];

export async function ViteBuilderPlugin(options: ExtendedOptions, devServer?: Server): Promise<PluginOption[]> {
  return [
    <VitePlugin>{
      // This plugin looks for other plugins that we need to replace out of the user's config,
      // specifically the react and svelte plugins, because we need to ignore story files from HMR.
      // TODO: check if this is still a problem in storybook 7, once the manager is prebundled.
      name: 'storybook:plugin-filter',
      enforce: 'pre',
      async config(viteConfig: any) {
        const { framework } = options;

        // Function that recurses through plugins and applies a mutator
        // We can't actually add or remove plugins in this `config` hook, so we're left with this hack
        function mutatePlugins(plugins: ViteConfig['plugins'], mutator: (plugin: VitePlugin) => void) {
          plugins?.forEach((plugin) => {
            if (Array.isArray(plugin)) {
              mutatePlugins(plugin, mutator);
            } else {
              if (typeof plugin === 'object') {
                // @ts-ignore-error technically these can be promises, but not sure how to deal with those
                plugin?.name && mutator(plugin);
              }
            }
          });
        }

        // Replace the user's react plugin with our version that adjusts hmr for stories
        if (framework === 'react') {
          mutatePlugins(viteConfig.plugins, (plugin) => {
            if (reactPlugins.includes(plugin.name)) {
              delete plugin.transform;
              delete plugin.configResolved;
              delete plugin.transformIndexHtml;
              plugin.name = plugin.name + ':noop';
            }
          });
        }

        // TODO: svelte

        // All frameworks need vite react plugin, now that it's safe, we can reset their names back to normal
        mutatePlugins(viteConfig.plugins, (plugin) => {
          if (reactPlugins.map((n) => `${n}:storybook`).includes(plugin.name)) {
            plugin.name = plugin.name.replace(':storybook', '');
          }
        });
      },
    },
    <VitePlugin>{
      name: 'storybook',
      enforce: 'pre',
      async config(viteConfig: any) {
        const { presets, framework } = options;

        // Merge our custom options with the user's vite config
        const config: ViteConfig = mergeConfig(viteConfig, {
          cacheDir: 'node_modules/.vite-storybook',
          // If an envPrefix is specified in the vite config, add STORYBOOK_ to it,
          // otherwise, add VITE_ and STORYBOOK_ so that vite doesn't lose its default.
          envPrefix: viteConfig.envPrefix ? 'STORYBOOK_' : ['VITE_', 'STORYBOOK_'],
          resolve:
            framework === 'vue3'
              ? {
                  alias: {
                    vue: 'vue/dist/vue.esm-bundler.js',
                  },
                }
              : {},
        });

        // Sanitize environment variables if needed
        const envsRaw = await presets.apply<Promise<EnvsRaw>>('env');
        if (Object.keys(envsRaw).length) {
          // Stringify env variables after getting `envPrefix` from the  config
          const envs = stringifyProcessEnvs(envsRaw, config.envPrefix);
          config.define = {
            ...config.define,
            ...envs,
          };
        }

        // Set up dev server if supplied
        if (devServer) {
          config.server = {
            middlewareMode: true,
            hmr: {
              port: options.port,
              server: devServer,
            },
            fs: {
              strict: true,
            },
          };
          config.appType = 'custom';
        }

        // Allow the user to have final say in viteFinal
        return await presets.apply('viteFinal', config, options);
      },
    },
  ];
}
