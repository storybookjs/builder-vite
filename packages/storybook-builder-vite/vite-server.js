const path = require('path');
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const { pluginConfig } = require('./vite-config');

module.exports.createViteServer = async function createViteServer(
    options,
    devServer
) {
    const { port, presets } = options;
    const root = path.resolve(options.configDir, '..');

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
