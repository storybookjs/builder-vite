module.exports = {
  framework: '@storybook/react',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: false,
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config;
  },
  // Normally this wouldn't be necessary, but `react-docgen-typescript` is the default,
  // and since typescript is installed in the monorepo, we can't rely on that check.
  typescript: {
    reactDocgen: 'react-docgen',
  },
};
