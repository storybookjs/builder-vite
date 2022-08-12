import { createServer } from 'vite';
import { commonConfig, pluginConfig } from './vite-config';
import type { Server } from 'http';
import type { ExtendedOptions } from './types';
import { getOptimizeDeps } from './optimizeDeps';
import { ViteBuilderPlugin } from './plugins/vite-builder';

export async function createViteServer(options: ExtendedOptions, devServer: Server) {
  const baseConfig = await commonConfig(options, 'development');
  const config = {
    ...baseConfig,
    plugins: await ViteBuilderPlugin(options, devServer),
  };

  // TODO: find a way to avoid having to do this in a separate step.
  config.optimizeDeps = await getOptimizeDeps(config, options);
  config.plugins = [...config.plugins, ...(await pluginConfig(options))];
  return createServer(config);
}
