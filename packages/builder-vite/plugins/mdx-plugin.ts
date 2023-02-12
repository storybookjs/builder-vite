import { dirname } from 'node:path';
import type { Options } from '@storybook/core-common';
import { Plugin } from 'vite';
import slash from 'slash';

const isStorybookMdx = (id: string) => id.endsWith('stories.mdx') || id.endsWith('story.mdx');

/**
 * Grab the mdx compiler from the @mdx-js/react that comes with @storybook/mdx1-csf,
 * and add it to the top of the code.
 * Equivilent to https://github.com/storybookjs/mdx1-csf/blob/d58cb032a8902b3f24ad487b6a7aae11ba8b33f6/loader.js#L12-L16
 */
function injectRenderer(code: string) {
  const mdxReactPackage = slash(
    dirname(
      require.resolve('@mdx-js/react/package.json', {
        paths: [dirname(require.resolve('@storybook/mdx1-csf/package.json'))],
      })
    )
  );

  return `
    import { mdx } from '${mdxReactPackage}';
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

        const code = features?.previewMdx2 ? mdxCode : injectRenderer(mdxCode);

        return {
          code,
          map: null,
        };
      }
    },
  };
}
