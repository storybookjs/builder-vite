const glob = require('glob-promise');
const path = require('path');
const { normalizePath } = require('vite');

/**
 * This file is largely based on https://github.com/storybookjs/storybook/blob/d1195cbd0c61687f1720fefdb772e2f490a46584/lib/core-common/src/utils/to-importFn.ts
 */

/**
 * This function takes an array of stories and creates a mapping between the stories' relative paths
 * to the working directory and their dynamic imports. The import is done in an asynchronous function
 * to delay loading. It then creates a function, `importFn(path)`, which resolves a path to an import
 * function and this is called by Storybook to fetch a story dynamically when needed.
 * @param stories An array of absolute story paths.
 * @returns {Promise<string>}
 */
async function toImportFn(stories) {
    const objectEntries = stories
        .map(file => `  './${normalizePath(path.relative(process.cwd(),file))}': async () => import('/@fs/${file}')`);
    return `
    const importers = {
      ${objectEntries.join(',\n')}
    };

    export async function importFn(path) {
        return importers[path]();
    }
  `;
}

module.exports.generateImportFnScriptCode =
    async function generateImportFnScriptCode(options) {
        // First we need to get an array of stories and their absolute paths.
        const stories = (
            await Promise.all(
                (
                    await options.presets.apply('stories', [], options)
                ).map((storyEntry) =>
                    glob(path.isAbsolute(storyEntry) ? storyEntry : path.join(options.configDir, storyEntry))
                )
            )
        ).reduce((carry, stories) => carry.concat(stories), []);

        // We can then call toImportFn to create a function that can be used to load each story dynamically.
        return (await toImportFn(stories)).trim();
    };
