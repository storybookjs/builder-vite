// noinspection JSUnusedGlobalSymbols

import * as fs from 'fs';
import * as path from 'path';
import { transformIframeHtml } from './transform-iframe-html';
import { createViteServer } from './vite-server';
import { build as viteBuild } from './build';

import type { Builder } from '@storybook/core-common';
import type { RequestHandler, Request, Response } from 'express';
import type { UserConfig, ViteDevServer } from 'vite';
import type { ExtendedOptions } from './types';

export interface ViteStats {}

export type ViteBuilder = Builder<UserConfig, ViteStats>;

function iframeMiddleware(options: ExtendedOptions, server: ViteDevServer): RequestHandler {
  return async (req, res, next) => {
    if (!req.url.match(/^\/iframe.html($|\?)/)) {
      next();
      return;
    }
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '..', 'input', 'iframe.html'), 'utf-8');
    const generated = await transformIframeHtml(indexHtml, options);
    const transformed = await server.transformIndexHtml('/iframe.html', generated);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(transformed);
  };
}

export const start: ViteBuilder['start'] = async ({ startTime, options, router, server: devServer }) => {
  const server = await createViteServer(options as ExtendedOptions, devServer);

  // Just mock this endpoint (which is really Webpack-specific) so we don't get spammed with 404 in browser devtools
  // TODO: we should either show some sort of progress from Vite, or just try to disable the whole Loader in the Manager UI.
  router.get('/progress', (req: Request, res: Response) => {
    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'text/event-stream');
  });

  router.use(await iframeMiddleware(options as ExtendedOptions, server));
  router.use(server.middlewares);

  function bail(e?: Error) {
    try {
      return server.close();
    } catch (err) {
      console.warn('unable to close vite server');
    }

    throw e;
  }

  return {
    bail,
    stats: {} as ViteStats,
    totalTime: process.hrtime(startTime),
  };
};

export const build: ViteBuilder['build'] = async ({ options }) => {
  return viteBuild(options as ExtendedOptions);
};

export const corePresets = [];
export const previewPresets = [];
