import type { Options } from '@storybook/core-common';
import { Plugin } from 'vite';

const isStorybookMdx = (id: string) => id.endsWith('stories.mdx') || id.endsWith('story.mdx');

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

  return {
    name: 'storybook-vite-mdx-plugin',
    enforce: 'pre',
    async transform(src, id) {
      if (id.match(/\.mdx?$/)) {
        // @ts-ignore
        const { compile } = features?.previewMdx2
          ? await import('@storybook/mdx2-csf')
          : await import('@storybook/mdx1-csf');

        // TODO: we don't currently support setting mdx options.  Storybook 7.0 does
        const mdxCode = String(await compile(src, { skipCsf: !isStorybookMdx(id) }));

        return {
          code: mdxCode,
          map: null,
        };
      }
    },
  };
}
