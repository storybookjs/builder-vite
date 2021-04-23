const mdx = require('vite-plugin-mdx').default;
const storybookCompilerPlugin = require('@storybook/addon-docs/dist/cjs/mdx/mdx-compiler-plugin.js');
const {mockCoreJs} = require("./mock-core-js");
const { codeGeneratorPlugin } = require('./code-generator-plugin');

module.exports.pluginConfig = function pluginConfig(options, type) {
    const { framework } = options;
    const plugins = [
        codeGeneratorPlugin(options),
        mockCoreJs(),
        mdx({
            compilers: [storybookCompilerPlugin()]
        }),
    ];
    if (framework === 'vue' || framework === 'vue3') {
        plugins.push(require('@vitejs/plugin-vue')());
    }

    if (type === 'development') {
        if (framework === 'react') {
            plugins.push(require('@vitejs/plugin-react-refresh')());
        }
    }

    return plugins;
}
