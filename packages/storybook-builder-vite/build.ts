import * as path from 'path';
import { allowedEnvPrefix as envPrefix, stringifyProcessEnvs } from './envs';
import { pluginConfig } from './vite-config';
import { build as viteBuild } from 'vite';

import type { UserConfig } from 'vite';
import type { EnvsRaw, ExtendedOptions } from './types';

export async function build(options: ExtendedOptions) {
  const { presets } = options;

  const config = {
    configFile: false,
    root: path.resolve(options.configDir, '..'),
    build: {
      outDir: options.outputDir,
      emptyOutDir: false, // do not clean before running Vite build - Storybook has already added assets in there!
      sourcemap: true,
    },
    envPrefix,
    define: {},
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: await pluginConfig(options, 'build'),
  } as UserConfig;

  const finalConfig = await presets.apply('viteFinal', config, options);

  const envsRaw = await presets.apply<Promise<EnvsRaw>>('env');
  // Stringify env variables after getting `envPrefix` from the final config
  const envs = stringifyProcessEnvs(envsRaw, finalConfig.envPrefix);
  // Update `define`
  finalConfig.define = {
    ...finalConfig.define,
    ...envs,
  };

  await viteBuild(finalConfig);
}
