const { transformIframeHtml } = require('./transform-iframe-html');
const { generateIframeScriptCode } = require('./codegen-iframe-script');

module.exports.codeGeneratorPlugin = function codeGeneratorPlugin(options) {
    const virtualFileId = '/virtual:/@storybook/builder-vite/vite-app.js';
    return {
        name: 'storybook-vite-code-generator-plugin',
        enforce: 'pre',
        configureServer(server) {
            // invalidate the whole vite-app.js script on every file change.
            // (this might be a little too aggressive?)
            server.watcher.on('change', (e) => {
                const { moduleGraph } = server;
                const module = moduleGraph.getModuleById(virtualFileId);
                if (module) {
                    server.moduleGraph.invalidateModule(module);
                }
            });
        },
        resolveId(source) {
            if (source === virtualFileId) {
                return virtualFileId;
            }
        },
        async load(id) {
            if (id === virtualFileId) {
                return generateIframeScriptCode(options);
            }
        },
        async transformIndexHtml(html, ctx) {
            if (ctx.path !== '/iframe.html') {
                return;
            }
            return transformIframeHtml(html, options);
        },
    };
};
