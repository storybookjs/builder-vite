const {mergeConfig} = require("vite");
const postcssLit = require("rollup-plugin-postcss-lit");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: "@storybook/web-components",
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        postcssLit()
      ]
    })
  },
}