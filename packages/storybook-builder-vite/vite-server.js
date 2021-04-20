const path = require('path');
const { optimizeDeps } = require('./optimizeDeps');
const { createServer } = require('vite');
const storybookCompilerPlugin = require('@storybook/addon-docs/dist/cjs/mdx/mdx-compiler-plugin.js');
const mdx = require('vite-plugin-mdx').default;
const { codeGeneratorPlugin } = require('./code-generator-plugin.js');
const { mockCoreJs } = require('./mock-core-js.js');

module.exports.createViteServer = async function createViteServer(
    options,
    devServer
) {
    const { port, framework } = options;

    const plugins = [
        codeGeneratorPlugin(options),
        mockCoreJs(),
        mdx({
            compilers: [storybookCompilerPlugin()]
        }),
    ];
    if (framework === 'vue') {
        plugins.push(require('@vitejs/plugin-vue'));
    } else if (framework === 'react') {
        plugins.push(require('@vitejs/plugin-react-refresh'));
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
