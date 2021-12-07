const fs = require('fs');
const path = require('path');
const { transformIframeHtml } = require('./transform-iframe-html');
const { generateIframeScriptCode } = require('./codegen-iframe-script');
const { generateModernIframeScriptCode } = require('./codegen-modern-iframe-script');
const { generateImportFnScriptCode } = require('./codegen-importfn-script');

module.exports.codeGeneratorPlugin = function codeGeneratorPlugin(options) {
    const virtualFileId = '/virtual:/@storybook/builder-vite/vite-app.js';
    const virtualStoriesFile = '/virtual:/@storybook/builder-vite/storybook-stories.js';
    const iframePath = path.resolve(__dirname, 'input', 'iframe.html');
    let iframeId;

    return {
        name: 'storybook-vite-code-generator-plugin',
        enforce: 'pre',
        configureServer(server) {
            // invalidate the whole vite-app.js script on every file change.
            // (this might be a little too aggressive?)
            server.watcher.on('change', (e) => {
                const { moduleGraph } = server;
                const appModule = moduleGraph.getModuleById(virtualFileId);
                if (appModule) {
                    server.moduleGraph.invalidateModule(appModule);
                }
                const storiesModule = moduleGraph.getModuleById(virtualStoriesFile);
                if (storiesModule) {
                    server.moduleGraph.invalidateModule(storiesModule);
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
                    input: iframePath,
                };
            }
        },
        configResolved(config) {
            iframeId = `${config.root}/iframe.html`;
        },
        resolveId(source) {
            if (source === virtualFileId) {
                return virtualFileId;
            } else if (source === iframePath) {
                return iframeId;
            } else if (source === virtualStoriesFile) {
                return virtualStoriesFile;
            }
        },
        async load(id) {
            if (id === virtualStoriesFile) {
                return generateImportFnScriptCode(options);
            }

            if (id === virtualFileId) {
                if (options.features && options.features.storyStoreV7) {
                    return generateModernIframeScriptCode(options, { storiesFilename: virtualStoriesFile });
                } else {
                    return generateIframeScriptCode(options);
                }
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
