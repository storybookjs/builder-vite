import * as path from 'path';
import { allowedEnvPrefix as envPrefix, stringifyProcessEnvs } from './envs';
import { getOptimizeDeps } from './optimizeDeps';
import { createServer } from 'vite';
import { pluginConfig } from './vite-config';

export async function createViteServer(options, devServer) {
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
  };

  const finalConfig = await presets.apply('viteFinal', defaultConfig, options);

  const envsRaw = await presets.apply('env');
  // Stringify env variables after getting `envPrefix` from the final config
  const envs = stringifyProcessEnvs(envsRaw, finalConfig.envPrefix);
  // Update `define`
  finalConfig.define = {
    ...finalConfig.define,
    ...envs,
  };

  return createServer(finalConfig);
}