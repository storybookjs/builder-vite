const path = require('path');
const { pluginConfig } = require('./vite-config');
const { build: viteBuild } = require('vite');

module.exports.build = async function build(options) {
    let vue3Path = 'vue/dist/vue.esm-bundler.js';

    try {
        // check for vue 3 alias by trying to resolve the vue3 package.json
        vue3Path = path.dirname(require.resolve('vue3/package.json'));
    } catch (e) {
        console.log('Could not find aliased vue3 continuing with vue 3 as "vue"');
    }

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
                vue: options.framework === 'vue'? 'vue/dist/vue.esm.js' : vue3Path,
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
