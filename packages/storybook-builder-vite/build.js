const path = require('path');
const { pluginConfig } = require('./vite-config');
const { build: viteBuild } = require('vite');

module.exports.build = async function build(options) {
    const config = {
        configFile: false,
        root: path.resolve(options.configDir, '..'),
        build: {
            outDir: options.outputDir,
            emptyOutDir: false, // do not clean before running Vite build - Storybook has already added assets in there!
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
