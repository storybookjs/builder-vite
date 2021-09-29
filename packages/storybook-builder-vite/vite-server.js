const path = require('path');
const {stringifyEnvs} = require('@storybook/core-common')
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const { pluginConfig } = require('./vite-config');

module.exports.createViteServer = async function createViteServer(
    options,
    devServer
) {
    const { port, presets } = options;
    const root = path.resolve(options.configDir, '..');
    const envsRaw = await presets.apply('env');
    const envs = stringifyProcessEnvs(envsRaw);

    const defaultConfig = {
        configFile: false,
        root,
        server: {
            force: true,
            middlewareMode: true,
            hmr: {
                port,
                server: devServer,
            },
            fs: {
                strict: true,
            },
        },
        define: envs,
        resolve: {
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        plugins: pluginConfig(options, 'development'),
        optimizeDeps,
    };

    const finalConfig = await presets.apply(
        'viteFinal',
        defaultConfig,
        options
    );
    return createServer(finalConfig);
};


/**
 * Customized version of stringifyProcessEnvs from @storybook/core-common which
 * uses import.meta.env instead of process.env
 */
 function stringifyProcessEnvs(raw) {
    const envs = Object.entries(raw).reduce(
        (acc, [key, value]) => {
          acc[`import.meta.env.${key}`] = JSON.stringify(value);
          return acc;
        },
        {
          // Default fallback
          'process.env.XSTORYBOOK_EXAMPLE_APP': '""',
        }
      );
    // support destructuring like
  // const { foo } = import.meta.env;
  envs['import.meta.env'] = JSON.stringify(stringifyEnvs(raw));
  return envs;
}
