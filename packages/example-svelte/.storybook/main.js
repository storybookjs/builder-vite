module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-svelte-csf',
    ],
    core: {
        builder: 'storybook-builder-vite',
    },
    viteFinal: async function webpackFinal(config, { configType }) {
        // customize the Vite config here
        return config;
    },
};
