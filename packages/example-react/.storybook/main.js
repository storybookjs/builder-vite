const { dirname } = require("path");

module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        // "@storybook/addon-a11y", // still breaks
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    core: {
        builder: 'storybook-builder-vite',
    },
    async viteFinal(config, { configType }) {
        // customize the Vite config here

        // https://github.com/eirslett/storybook-builder-vite/issues/55
        config.root = dirname(require.resolve("storybook-builder-vite"));
        config.server.fsServe = undefined;

        return config;
    },
};
