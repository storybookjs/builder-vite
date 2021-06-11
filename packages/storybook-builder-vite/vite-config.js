const mdx = require('vite-plugin-mdx').default;
const { createCompiler: storybookCompilerPlugin } = require('@storybook/csf-tools/mdx');
const { mockCoreJs } = require('./mock-core-js');
const { codeGeneratorPlugin } = require('./code-generator-plugin');

module.exports.pluginConfig = function pluginConfig(options, type) {
    const { framework } = options;
    const plugins = [
        codeGeneratorPlugin(options),
        mockCoreJs(),
        mdx({
            compilers: [storybookCompilerPlugin()],
        }),
    ];
    if (framework === 'vue' || framework === 'vue3') {
        plugins.push(require('@vitejs/plugin-vue')());
    }
    if (framework === 'svelte') {
        plugins.push(require('@sveltejs/vite-plugin-svelte').svelte());
        plugins.push(require('./svelte/csf-plugin'));
    }

    if (type === 'development') {
        if (framework === 'react') {
            plugins.push(require('@vitejs/plugin-react-refresh')());
        }
    }

    return plugins;
};
