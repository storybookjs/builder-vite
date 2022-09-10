import type { Options } from '@storybook/core-common';
import { Plugin } from 'vite';

const isStorybookMdx = (id: string) => id.endsWith('stories.mdx') || id.endsWith('story.mdx');

function injectRenderer(code: string, mdx2: boolean) {
  if (mdx2) {
    return `
           import React from 'react';
           ${code}
           `;
  }

  return `
        /* @jsx mdx */
        import React from 'react';
        import { mdx } from '@mdx-js/react';
        ${code}
        `;
}

/**
 * Storybook uses two different loaders when dealing with MDX:
 *
 * - *stories.mdx and *story.mdx are compiled with the CSF compiler
 * - *.mdx are compiled with the MDX compiler directly
 *
 * @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx
 */
export function mdxPlugin(options: Options): Plugin {
  const { features } = options;

  let reactRefresh: Plugin | undefined;

  return {
    name: 'storybook-vite-mdx-plugin',
    enforce: 'pre',
    configResolved({ plugins }) {
      // @vitejs/plugin-react-refresh has been upgraded to @vitejs/plugin-react,
      // and the name of the plugin performing `transform` has been changed from 'react-refresh' to 'vite:react-babel',
      // to be compatible, we need to look for both plugin name.
      // We should also look for the other plugins names exported from @vitejs/plugin-react in case there are some internal refactors.
      const reactRefreshPlugins = plugins.filter(
        (p) =>
          p.name === 'react-refresh' ||
          p.name === 'vite:react-babel' ||
          p.name === 'vite:react-refresh' ||
          p.name === 'vite:react-jsx'
      );
      reactRefresh = reactRefreshPlugins.find((p) => p.transform);
    },
    async transform(src, id, options) {
      if (id.match(/\.mdx?$/)) {
        // @ts-ignore
        const { compile } = features?.previewMdx2
          ? await import('@storybook/mdx2-csf')
          : await import('@storybook/mdx1-csf');

        const mdxCode = String(await compile(src, { skipCsf: !isStorybookMdx(id) }));

        const modifiedCode = injectRenderer(mdxCode, Boolean(features?.previewMdx2));

        // Hooks in recent rollup versions can be functions or objects, and though react hasn't changed, the typescript defs have
        const rTransform = reactRefresh?.transform;
        const transform = rTransform && 'handler' in rTransform ? rTransform.handler : rTransform;

        const result = await transform!.call(this, modifiedCode, `${id}.jsx`, options);

        if (!result) return modifiedCode;

        if (typeof result === 'string') return result;

        const { code, map: resultMap } = result;

        return { code, map: !resultMap || typeof resultMap === 'string' ? resultMap : { ...resultMap, sources: [id] } };
      }
    },
  };
}
