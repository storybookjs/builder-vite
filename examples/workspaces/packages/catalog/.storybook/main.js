module.exports = {
  framework: '@storybook/react',
  stories: ['../../app/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config;
  },
};
