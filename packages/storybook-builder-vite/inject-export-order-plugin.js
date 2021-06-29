const { parse } = require('es-module-lexer');

module.exports.injectExportOrderPlugin = function injectExportOrderPlugin(options) {
  return {
    name: 'storybook-vite-inject-export-order-plugin',
    // This should only run after the typescript has been transpiled
    enforce: 'post',
    async transform(code, id) {
      /**
       * This doesn't feel right, we already get a list of stories in generateIframeScriptCode
       * based on presets.apply('stories'). What's the best way for us to reuse those stories?
       * Should we introduce a viteBuilderContext?
       * 
       * await options.presets.apply('stories')
       */
      if (!/\.stories\.(t|j)sx?$/.test(id)) {
        return;
      }

      const [, exports] = parse(code);
      if (exports.includes('__namedExportsOrder')) {
        // user has defined named exports already
        return;
      }

      const orderedExports = exports.filter(e => e !== 'default');
      const exportsArray = `['${orderedExports.join("', '")}']`;

      return `${code};\nexport const __namedExportsOrder = ${exportsArray};`;
    }
  }
}
