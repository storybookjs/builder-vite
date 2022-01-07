import * as path from 'path';
import { createServer } from 'vite';
import { allowedEnvPrefix as envPrefix, stringifyProcessEnvs } from './envs';
import { getOptimizeDeps } from './optimizeDeps';
import { pluginConfig } from './vite-config';

import type { Server } from 'http';
import type { UserConfig } from 'vite';
import type { EnvsRaw, ExtendedOptions } from './types';

export async function createViteServer(options: ExtendedOptions, devServer: Server) {
  const { port, presets } = options;
  const root = path.resolve(options.configDir, '..');

  const defaultConfig = {
    configFile: false,
    root,
    server: {
      middlewareMode: true,
      hmr: {
        port,
        server: devServer,
      },
      fs: {
        strict: true,
      },
    },
    envPrefix,
    define: {},
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: await pluginConfig(options, 'development'),
    optimizeDeps: await getOptimizeDeps(root, options),
  } as UserConfig;

  const finalConfig = await presets.apply('viteFinal', defaultConfig, options);

  const envsRaw = await presets.apply<Promise<EnvsRaw>>('env');
  // Stringify env variables after getting `envPrefix` from the final config
  const envs = stringifyProcessEnvs(envsRaw, finalConfig.envPrefix);
  // Update `define`
  finalConfig.define = {
    ...finalConfig.define,
    ...envs,
  };

  return createServer(finalConfig);
}
