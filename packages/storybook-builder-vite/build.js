const path = require('path');
const { pluginConfig } = require('./vite-config');
const { build: viteBuild } = require('vite');

module.exports.build = async function build(options) {
    const config = {
        configFile: false,
        // We create a kind of "custom" source root inside this project (yes, inside the node_modules folder)
        // so that "iframe.html" resolves to a correct path. (Otherwise, Vite will fail.)
        root: path.resolve(__dirname, 'input'),
        build: {
            outDir: options.outputDir,
            rollupOptions: {
                input: {
                    'iframe.html': path.resolve(
                        __dirname,
                        'input',
                        'iframe.html'
                    ),
                },
            },
            sourcemap: true,
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js',
            },
        },
        plugins: pluginConfig(options, 'build'),
    };

    const finalConfig = await options.presets.apply(
        'viteFinal',
        config,
        options
    );
    await viteBuild(finalConfig);
};
