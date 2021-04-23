const path = require('path');
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const {pluginConfig} = require("./vite-config");

module.exports.createViteServer = async function createViteServer(
    options,
    devServer
) {
    const { port, framework } = options;

    const server = await createServer({
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
    });

    return server;
};
