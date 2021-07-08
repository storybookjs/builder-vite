const fs = require('fs');
const path = require('path');
const { transformIframeHtml } = require('./transform-iframe-html');
const { generateIframeScriptCode } = require('./codegen-iframe-script');

module.exports.codeGeneratorPlugin = function codeGeneratorPlugin(options) {
    const virtualFileId = '/virtual:/@storybook/builder-vite/vite-app.js';
    let iframeId;
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
        config(config, { command }) {
            // If we are building the static distribution, add iframe.html as an entry.
            // In development mode, it's not an entry - instead, we use an express middleware
            // to serve iframe.html. The reason is that Vite's dev server (at the time of writing)
            // does not support virtual files as entry points.
            if (command === 'build') {
                config.build.rollupOptions = {
                    input: 'iframe.html',
                };
            }
        },
        configResolved(config) {
            iframeId = `${config.root}/iframe.html`;
        },
        resolveId(source) {
            if (source === virtualFileId) {
                return virtualFileId;
            } else if (source === 'iframe.html') {
                return iframeId;
            }
        },
        async load(id) {
            if (id === virtualFileId) {
                return generateIframeScriptCode(options);
            }
            if (id === iframeId) {
                return fs.readFileSync(
                    path.resolve(__dirname, 'input', 'iframe.html'),
                    'utf-8'
                );
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
