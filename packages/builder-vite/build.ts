import { build as viteBuild } from 'vite';
import { stringifyProcessEnvs } from './envs';
import { commonConfig } from './vite-config';

import type { EnvsRaw, ExtendedOptions } from './types';

export async function build(options: ExtendedOptions) {
  const { presets } = options;

  const baseConfig = await commonConfig(options, 'build');
  const config = {
    ...baseConfig,
    build: {
      outDir: options.outputDir,
      emptyOutDir: false, // do not clean before running Vite build - Storybook has already added assets in there!
      sourcemap: true,
    },
    esbuild: {
      // Workaround for #206: https://github.com/storybookjs/builder-vite/issues/206#issuecomment-1122347230
      // Makes sure that mocked actions can be recognized in the production build.
      keepNames: true,
    },
  };

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
