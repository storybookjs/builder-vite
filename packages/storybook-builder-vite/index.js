const fs = require('fs');
const path = require('path');
const { transformIframeHtml } = require('./transform-iframe-html');
const { createViteServer } = require('./vite-server.js');
const { build: viteBuild } = require('./build');

function iframeMiddleware(options, server) {
    return async (req, res, next) => {
        if (!req.url.match(/^\/iframe.html($|\?)/)) {
            next();
            return;
        }
        const indexHtml = fs.readFileSync(
            path.resolve(__dirname, 'input', 'iframe.html'),
            'utf-8'
        );
        const generated = await transformIframeHtml(indexHtml, options);
        const transformed = await server.transformIndexHtml(
            '/iframe.html',
            generated
        );
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(transformed);
    };
}

module.exports.start = async function start({
    startTime,
    options,
    router,
    server: devServer,
}) {
    const server = await createViteServer(options, devServer);

    // Just mock this endpoint (which is really Webpack-specific) so we don't get spammed with 404 in browser devtools
    // TODO: we should either show some sort of progress from Vite, or just try to disable the whole Loader in the Manager UI.
    router.get('/progress', (req, res) => {
        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'text/event-stream');
    });

    router.use(await iframeMiddleware(options, server));
    router.use(server.middlewares);

    function bail(e) {
        try {
            server.close();
        } catch (err) {
            console.warn('unable to close vite server');
        }

        throw e;
    }

    return {
        bail,
        totalTime: process.hrtime(startTime),
    };
};

module.exports.build = async function build({ options }) {
    return viteBuild(options);
};

module.exports.corePresets = [];
module.exports.previewPresets = [];
