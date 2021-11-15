const inject =
    require('@storybook/source-loader/dist/cjs/abstract-syntax-tree/inject-decorator').default;

module.exports.sourceLoaderPlugin = function () {
    return {
        name: 'storybook-vite-source-loader-plugin',
        enforce: 'pre',
        transform(src, id) {
            if (id.match(/\.stories\.[jt]sx?$/)) {
                const { source, sourceJson, addsMap } = inject(src, id);
                const preamble = `
                    /* eslint-disable */
                    // @ts-nocheck
                    // @ts-ignore
                    var __STORY__ = ${sourceJson};
                    // @ts-ignore
                    var __LOCATIONS_MAP__ = ${JSON.stringify(addsMap)};
                `;

                return {
                    code: `${preamble}\n${source}`,
                    map: { mappings: '' },
                };
            }
        },
    };
};
