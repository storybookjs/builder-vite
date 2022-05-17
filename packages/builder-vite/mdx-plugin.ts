// import { ExtendedOptions } from '../types';
import mdx from 'vite-plugin-mdx';
import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'vite';
const { logger } = require('@storybook/node-logger');
const { createCompiler } = require('@storybook/csf-tools/mdx');

type Options = {
  include?: string | RegExp | (string | RegExp)[];
  exclude?: string | RegExp | (string | RegExp)[];
};

/**
 * Storybook uses two different loaders when dealing with MDX:
 *
 * - *stories.mdx and *story.mdx are compiled with the CSF compiler
 * - *.mdx are compiled with the MDX compiler directly
 *
 * @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx
 */
export async function mdxPlugin(config: any): Promise<Plugin | Plugin[]> {
  const { features } = config;

  if (features?.previewMdx2) {
    logger.info('using MDX2');

    // @ts-expect-error the types of mdx2-csf don't seem quite right
    const { compile } = await import('@storybook/mdx2-csf');
    let reactRefreshPlugin: Plugin | undefined;

    return {
      name: 'storybook-builder-vite:mdx2-plugin',
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
        reactRefreshPlugin = reactRefreshPlugins.find((p: any) => p.transform);
      },
      async transform(src: string, id: string, ssr) {
        if (!/\.mdx?$/.test(id)) return src;
        const code = await compile(src, { skipCsf: true });

        // This won't work until we have a way to get a compiled result unprocessed by Babel
        const refreshResult = await reactRefreshPlugin?.transform!.call(this, code, id + '.jsx', ssr);

        return (
          refreshResult || {
            code: String(code),
            map: { mappings: '' },
          }
        );
      },
    };
  }

  // MDX1
  return mdx((filename) => {
    const compilers = [];

    if (filename.endsWith('stories.mdx') || filename.endsWith('story.mdx')) {
      compilers.push(createCompiler({}));
    }

    return {
      compilers,
    };
  });
}
