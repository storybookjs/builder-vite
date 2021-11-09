const mdx = require('vite-plugin-mdx').default;
const { createCompiler } = require('@storybook/csf-tools/mdx');

/**
 * Storybook uses two different loaders when dealing with MDX:
 *
 * - *.stories.mdx are compiled with the CSF compiler
 * - *.mdx are compiled with the MDX compiler directly
 *
 * @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx
 */
module.exports.mdxPlugin = function () {
    return mdx((filename) => {
        const compilers = [];

        if (filename.includes('.stories.')) {
            compilers.push(createCompiler());
        }

        return {
            compilers,
        };
    });
};
