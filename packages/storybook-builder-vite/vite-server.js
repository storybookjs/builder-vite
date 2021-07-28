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
    let vue3Path = 'vue/dist/vue.esm-bundler.js';

    try {
        // check for vue 3 alias by trying to resolve the vue3 package.json
        vue3Path = path.dirname(require.resolve('vue3/package.json'));
    } catch (e) {
        console.log('Could not find aliased vue3 continuing with vue 3 as "vue"');
    }

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
                vue: options.framework === 'vue'? 'vue/dist/vue.esm.js' : vue3Path,
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
