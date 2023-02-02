import { parse } from 'es-module-lexer';
import MagicString from 'magic-string';

export const injectExportOrderPlugin = {
  name: 'storybook-vite-inject-export-order-plugin',
  // This should only run after the typescript has been transpiled
  enforce: 'post',
  async transform(code: string, id: string) {
    if (!/\.stories\.(?:[tj]sx?|vue)$/.test(id) && !/(stories|story).mdx$/.test(id)) {
      return;
    }
    // TODO: Maybe convert `injectExportOrderPlugin` to function that returns object,
    //  and run `await init;` once and then call `parse()` without `await`,
    //  instead of calling `await parse()` every time.
    const [, exports] = await parse(code);
    if (exports.includes('__namedExportsOrder')) {
      // user has defined named exports already
      return;
    }
    const s = new MagicString(code);
    const orderedExports = exports.filter((e) => e !== 'default');
    s.append(`;export const __namedExportsOrder = ${JSON.stringify(orderedExports)};`);
    return {
      code: s.toString(),
      map: s.generateMap({ hires: true, source: id }),
    };
  },
};
