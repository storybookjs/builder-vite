const mdx = require('vite-plugin-mdx').default;
const {
    createCompiler: storybookCompilerPlugin,
} = require('@storybook/csf-tools/mdx');
const { mockCoreJs } = require('./mock-core-js');
const { codeGeneratorPlugin } = require('./code-generator-plugin');
const { injectExportOrderPlugin } = require('./inject-export-order-plugin');

module.exports.pluginConfig = function pluginConfig(options, type) {
    const { framework, svelteOptions } = options;
    const plugins = [
        codeGeneratorPlugin(options),
        mockCoreJs(),
        mdx({
            compilers: [storybookCompilerPlugin()],
        }),
        injectExportOrderPlugin,
    ];
    if (framework === 'vue') {
        try {
            const { createVuePlugin } = require('vite-plugin-vue2');
            plugins.push(createVuePlugin());
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw new Error(
                    'storybook-builder-vite requires vite-plugin-vue2 to be installed when using @storybook/vue.  Please install it and start storybook again.'
                );
            }
            throw err;
        }
    }
    if (framework === 'vue3') {
        try {
            const vuePlugin = require('@vitejs/plugin-vue');
            plugins.push(vuePlugin());
            plugins.push(require('./plugins/vue-docgen')());
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw new Error(
                    'storybook-builder-vite requires @vitejs/plugin-vue to be installed when using @storybook/vue3.  Please install it and start storybook again.'
                );
            }
            throw err;
        }
    }
    if (framework === 'svelte') {
        try {
            const sveltePlugin = require('@sveltejs/vite-plugin-svelte').svelte;
            plugins.push(sveltePlugin(svelteOptions));
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw new Error(
                    'storybook-builder-vite requires @sveltejs/vite-plugin-svelte to be installed when using @storybook/svelte.  Please install it and start storybook again.'
                );
            }
            throw err;
        }

        try {
            const csfPlugin = require('./svelte/csf-plugin');
            plugins.push(csfPlugin);
        } catch (err) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                throw new Error(
                    'storybook-builder-vite requires @storybook/addon-svelte-csf to be installed when using @storybook/svelte.  Please install it and start storybook again.'
                );
            }
            throw err;
        }
    }

    if (framework === 'react') {
        plugins.push(
            require('@vitejs/plugin-react')({
                // Do not treat story files as HMR boundaries, storybook itself needs to handle them.
                exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
            })
        );
    }

    return plugins;
};
