import sourceLoaderTransform from '@storybook/source-loader';

export function sourceLoaderPlugin() {
  return {
    name: 'storybook-vite-source-loader-plugin',
    enforce: 'pre',
    async transform(src: string, id: string) {
      if (id.match(/\.stories\.[jt]sx?$/)) {
        // We need to mock 'this' when calling transform from @storybook/source-loader
        // noinspection JSUnusedGlobalSymbols
        const mockClassLoader = { emitWarning: (message: string) => console.warn(message), resourcePath: id };
        const code = await sourceLoaderTransform.call(mockClassLoader, src);

        return {
          code,
          map: { mappings: '' },
        };
      }
    },
  };
}
