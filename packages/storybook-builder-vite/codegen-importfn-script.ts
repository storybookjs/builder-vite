import * as path from 'path';
import slash from 'slash';
import { normalizePath } from 'vite';
import { listStories } from './list-stories';

import type { Options } from '@storybook/core-common';
import type { ExtendedOptions } from './types';
/**
 * This file is largely based on https://github.com/storybookjs/storybook/blob/d1195cbd0c61687f1720fefdb772e2f490a46584/lib/core-common/src/utils/to-importFn.ts
 */

/**
 * Paths get passed either with no leading './' - e.g. `src/Foo.stories.js`,
 * or with a leading `../` (etc), e.g. `../src/Foo.stories.js`.
 * We want to deal in importPaths relative to the working dir, so we normalize
 */
function toImportPath(relativePath: string) {
  return relativePath.startsWith('../') ? relativePath : `./${relativePath}`;
}

/**
 * This function takes an array of stories and creates a mapping between the stories' relative paths
 * to the working directory and their dynamic imports. The import is done in an asynchronous function
 * to delay loading. It then creates a function, `importFn(path)`, which resolves a path to an import
 * function and this is called by Storybook to fetch a story dynamically when needed.
 * @param stories An array of absolute story paths.
 */
async function toImportFn(stories: string[]) {
  const objectEntries = stories.map((file) => {
    return `  '${toImportPath(normalizePath(path.relative(process.cwd(), file)))}': async () => import('/@fs/${file}')`;
  });

  return `
    const importers = {
      ${objectEntries.join(',\n')}
    };

    export async function importFn(path) {
        return importers[path]();
    }
  `;
}

export async function generateImportFnScriptCode(options: Options) {
  // First we need to get an array of stories and their absolute paths.
  const stories = await listStories(options);

  // We can then call toImportFn to create a function that can be used to load each story dynamically.
  return (await toImportFn(stories)).trim();
}

const absoluteFilesToImport = (files: string[], name: string) =>
  files.map((el, i) => `import ${name ? `* as ${name}_${i} from ` : ''}'/@fs/${normalizePath(el)}'`).join('\n');

export async function generateVirtualStoryEntryCode(options: ExtendedOptions) {
  const storyEntries = await listStories(options);
  const resolveMap = storyEntries.reduce<Record<string, string>>(
    (prev, entry) => ({ ...prev, [entry]: entry.replace(slash(process.cwd()), '.') }),
    {}
  );
  const modules = storyEntries.map((entry, i) => `${JSON.stringify(entry)}: story_${i}`).join(',');

  return `
    ${absoluteFilesToImport(storyEntries, 'story')}

    function loadable(key) {
      return {${modules}}[key];
    }
    
    Object.assign(loadable, {
      keys: () => (${JSON.stringify(Object.keys(resolveMap))}),
      resolve: (key) => (${JSON.stringify(resolveMap)}[key])
    });

    export function configStories(configure) {
      configure(loadable, { hot: import.meta.hot }, false);
    }
  `.trim();
}
