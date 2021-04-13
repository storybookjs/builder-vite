// We need Vite to precompile these dependencies, because they contain non-ESM code that would break
// if we served it directly to the browser.
module.exports.optimizeDeps = {
    include: [
        'airbnb-js-shims',
        'lodash/mapValues',
        'lodash/pick',
        'lodash/isFunction',
        'lodash/isString',
        'lodash/isPlainObject',
        'lodash/pickBy',
        'lodash/uniq',
        'lodash/cloneDeep',
        'prop-types',
        'deep-object-diff',
        'markdown-to-jsx',
        'react-textarea-autosize',
        'uuid-browser/v4',
        '@emotion/styled',
        '@emotion/core',
        'emotion-theming',
        '@emotion/is-prop-valid',
        'polished',
        'doctrine',
        'fast-deep-equal',
        '@mdx-js/react',
        'react',
        'react-dom',
        'ansi-to-html',
        'telejson',
        '@storybook/csf',
        'regenerator-runtime/runtime.js',
        'memoizerific',
        'ts-dedent',
        'stable',
        'store2',
        'util-deprecate',
        'global',
        'html-tags',
        'escodegen',
        'acorn',
        'acorn-jsx',
        'acorn-walk',
        'qs',
    ].filter((m) => {
        try {
            require.resolve(m);
            return true;
        } catch (err) {
            return false;
        }
    }),
};
