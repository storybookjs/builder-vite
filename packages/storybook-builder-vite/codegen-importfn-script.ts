import { promise as glob } from 'glob-promise';
import * as path from 'path';
import { normalizePath } from 'vite';

/**
 * This file is largely based on https://github.com/storybookjs/storybook/blob/d1195cbd0c61687f1720fefdb772e2f490a46584/lib/core-common/src/utils/to-importFn.ts
 */

/**
 * Paths get passed either with no leading './' - e.g. `src/Foo.stories.js`,
 * or with a leading `../` (etc), e.g. `../src/Foo.stories.js`.
 * We want to deal in importPaths relative to the working dir, so we normalize
 *
 * @param {string} relativePath
 * @returns {string}
 */
function toImportPath(relativePath) {
  return relativePath.startsWith('../') ? relativePath : `./${relativePath}`;
}

/**
 * This function takes an array of stories and creates a mapping between the stories' relative paths
 * to the working directory and their dynamic imports. The import is done in an asynchronous function
 * to delay loading. It then creates a function, `importFn(path)`, which resolves a path to an import
 * function and this is called by Storybook to fetch a story dynamically when needed.
 * @param stories An array of absolute story paths.
 * @returns {Promise<string>}
 */
async function toImportFn(stories) {
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

export async function generateImportFnScriptCode(options) {
  // First we need to get an array of stories and their absolute paths.
  const stories = (
    await Promise.all(
      (
        await options.presets.apply('stories', [], options)
      ).map((storyEntry) => glob(path.isAbsolute(storyEntry) ? storyEntry : path.join(options.configDir, storyEntry)))
    )
  ).reduce((carry, stories) => carry.concat(stories), []);

  // We can then call toImportFn to create a function that can be used to load each story dynamically.
  return (await toImportFn(stories)).trim();
}
