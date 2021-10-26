module.exports = {
    framework: '@storybook/vue3',
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    core: {
        builder: 'storybook-builder-vite',
    },
    async viteFinal(config, { configType }) {
        // customize the Vite config here
        return config;
    },
};
