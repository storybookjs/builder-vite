const path = require('path');
const { build: viteBuild } = require('vite');
const mdx = require('vite-plugin-mdx').default;
const storybookCompilerPlugin = require('@storybook/addon-docs/dist/cjs/mdx/mdx-compiler-plugin.js');
const {mockCoreJs} = require("./mock-core-js");
const { codeGeneratorPlugin } = require('./code-generator-plugin');

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
        plugins: [
            codeGeneratorPlugin(options),
            mockCoreJs(),
            mdx({
                compilers: [storybookCompilerPlugin()]
            }),
        ],
    };

    await viteBuild(config);
};
