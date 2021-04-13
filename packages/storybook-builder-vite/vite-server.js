const path = require('path');
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const { codeGeneratorPlugin } = require('./code-generator-plugin.js');
const reactPlugin = require('@vitejs/plugin-react-refresh');

module.exports.createViteServer = async function createViteServer(
    options,
    devServer
) {
    const { port, framework } = options;

    const plugins = [codeGeneratorPlugin(options)];
    if (framework === 'vue') {
        const vuePlugin = await import('@vitejs/plugin-vue').then((plugin) =>
            plugin.default()
        );
        plugins.push(vuePlugin);
    } else if (framework === 'react') {
        // Somewhat ironically, HMR works without this plugin, but is broken with the plugin enabled.
        // const reactPlugin = await import('@vitejs/plugin-react-refresh').then(plugin => plugin.default());
        plugins.push(reactPlugin);
    }

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
        plugins,
        optimizeDeps,
    });

    return server;
};
