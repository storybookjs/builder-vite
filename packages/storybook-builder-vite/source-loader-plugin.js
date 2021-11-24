const sourceLoaderTransform =
    require('@storybook/source-loader').default;

module.exports.sourceLoaderPlugin = function () {
    return {
        name: 'storybook-vite-source-loader-plugin',
        enforce: 'pre',
        async transform(src, id) {
            if (id.match(/\.stories\.[jt]sx?$/)) {
                // We need to mock 'this' when calling transform from @storybook/source-loader
                const mockClassLoader = { emitWarning: (message) => console.warn(message), resourcePath: id };
                const code = await sourceLoaderTransform.call(mockClassLoader, src);

                return {
                    code,
                    map: { mappings: '' },
                };
            }
        },
    };
};
