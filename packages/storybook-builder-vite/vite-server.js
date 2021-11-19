const path = require('path');
const {stringifyProcessEnvs} = require('./envs');
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const { pluginConfig } = require('./vite-config');

const storybookPaths = [
    'addons',
    'api',
    'channels',
    'channel-postmessage',
    'components',
    'core-events',
    'router',
    'theming',
    'semver',
    'client-api',
    'client-logger',
    'preview-web',
    'store',
].reduce(
    (acc, sbPackage) => ({
        ...acc,
        [`@storybook/${sbPackage}`]: path.dirname(
            require.resolve(`@storybook/${sbPackage}/package.json`)
        ),
    }),
    {}
);

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
                ...storybookPaths
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



