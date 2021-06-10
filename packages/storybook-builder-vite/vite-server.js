const path = require('path');
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const { pluginConfig } = require('./vite-config');

module.exports.createViteServer = async function createViteServer(
    options,
    devServer
) {
    const { port, presets } = options;

    const defaultConfig = {
        configFile: false,
        root: path.resolve(__dirname, 'input'),
        server: {
            middlewareMode: true,
            hmr: {
                port,
                server: devServer,
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
