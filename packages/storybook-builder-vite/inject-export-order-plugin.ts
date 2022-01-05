import { parse } from 'es-module-lexer';

export const injectExportOrderPlugin = {
  name: 'storybook-vite-inject-export-order-plugin',
  // This should only run after the typescript has been transpiled
  enforce: 'post',
  async transform(code, id) {
    if (!/\.stories\.([tj])sx?$/.test(id)) {
      return;
    }
    const [, exports] = await parse(code);

    if (exports.includes('__namedExportsOrder')) {
      // user has defined named exports already
      return;
    }

    const orderedExports = exports.filter((e) => e !== 'default');

    return {
      code: `${code};\nexport const __namedExportsOrder = ${JSON.stringify(orderedExports)};`,
      map: null,
    };
  },
};
