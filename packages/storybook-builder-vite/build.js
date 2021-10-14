const path = require('path');
const { stringifyProcessEnvs } = require('./envs');
const { pluginConfig } = require('./vite-config');
const { build: viteBuild } = require('vite');

module.exports.build = async function build(options) {
    const { presets, framework } = options;
    const envsRaw = await presets.apply('env');
    const envs = stringifyProcessEnvs(envsRaw);

    const config = {
        configFile: false,
        root: path.resolve(options.configDir, '..'),
        build: {
            outDir: options.outputDir,
            emptyOutDir: false, // do not clean before running Vite build - Storybook has already added assets in there!
            sourcemap: true,
        },
        define: envs,
        resolve: {
            alias: {
                vue: framework === 'vue' ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.esm-bundler.js',
            },
        },
        plugins: pluginConfig(options, 'build'),
    };

    const finalConfig = await presets.apply(
        'viteFinal',
        config,
        options
    );
    await viteBuild(finalConfig);
};
