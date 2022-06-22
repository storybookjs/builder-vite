import mdx from 'vite-plugin-mdx';
import { createCompiler } from '@storybook/csf-tools/mdx';

type Options = {
  framework: string;
};

/**
 * Storybook uses two different loaders when dealing with MDX:
 *
 * - *stories.mdx and *story.mdx are compiled with the CSF compiler
 * - *.mdx are compiled with the MDX compiler directly
 *
 * @see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx
 */
export function mdxPlugin({ framework }: Options) {
  const mdxPlugin =
    framework === 'preact'
      ? mdx.withImports({ preact: ['h'], '@mdx-js/preact': ['mdx'] })
      : mdx.withImports({ react: 'React', '@mdx-js/react': ['mdx'] });

  return mdxPlugin((filename) => {
    const compilers = [];

    if (filename.endsWith('stories.mdx') || filename.endsWith('story.mdx')) {
      compilers.push(createCompiler({}));
    }

    return {
      compilers,
    };
  });
}
