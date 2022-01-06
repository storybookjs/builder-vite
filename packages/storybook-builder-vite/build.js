const path = require('path');
const { stringifyProcessEnvs, allowedEnvPrefix: envPrefix } = require('./envs');
const { pluginConfig } = require('./vite-config');
const { build: viteBuild } = require('vite');

module.exports.build = async function build(options) {
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
  };

  const finalConfig = await presets.apply('viteFinal', config, options);

  const envsRaw = await presets.apply('env');
  // Stringify env variables after getting `envPrefix` from the final config
  const envs = stringifyProcessEnvs(envsRaw, finalConfig.envPrefix);
  // Update `define`
  finalConfig.define = {
    ...finalConfig.define,
    ...envs,
  };

  await viteBuild(finalConfig);
};
