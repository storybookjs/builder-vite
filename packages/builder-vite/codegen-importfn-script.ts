import * as path from 'path';
import { normalizePath } from 'vite';
import type { ExtendedOptions } from './types';
import { listStories } from './list-stories';

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
function toImportFnLazy(stories: string[]) {
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

/**
 * This function takes an array of stories and creates a mapping between the stories' relative paths
 * to the working directory and their imports. The import is done synchronously, as opposed to toImportFnLazy.
 * It then creates a function, `importFn(path)`, which resolves a path to an import
 * function and this is called by Storybook to fetch a story dynamically when needed.
 * @param stories An array of absolute story paths.
 */
function toImportFn(stories: string[]) {
  const imports = stories.map((file, index) => {
    return `import * as story${index} from '/@fs/${file}';`;
  });

  const objectEntries = stories.map((file, index) => {
    return `  '${toImportPath(normalizePath(path.relative(process.cwd(), file)))}': () => story${index}`;
  });

  return `
    ${imports.join('\n')}

    const importers = {
      ${objectEntries.join(',\n')}
    };

    export async function importFn(path) {
        return importers[path]();
    }
  `;
}

export async function generateImportFnScriptCode(options: ExtendedOptions) {
  // First we need to get an array of stories and their absolute paths.
  const stories = await listStories(options);

  // We can then create a function that can be used to load each story dynamically.
  return options.features?.eagerImportStories ? toImportFnLazy(stories).trim() : toImportFn(stories).trim();
}
