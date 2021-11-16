const path = require('path');
const glob = require('glob-promise');
const { normalizePath } = require('vite');
const { loadPreviewOrConfigFile } = require('@storybook/core-common');

// This is somewhat of a hack; the problem is that previewEntries resolves to
// the CommonJS imports, probably because require.resolve in Node.js land leads
// to that. For Vite, we need the ESM modules.
function replaceCJStoESMPath(entryPath) {
    return entryPath.replace('/cjs/', '/esm/');
}

module.exports.generateIframeScriptCode =
    async function generateIframeScriptCode(options) {
        const { presets, configDir, framework, frameworkPath } = options;
        const previewEntries = (
            await presets.apply('previewEntries', [], options)
        ).map(replaceCJStoESMPath);

        // Ensure that the client API is initialized by the framework before any other iframe code
        // is loaded. That way our client-apis can assume the existence of the API+store
        const frameworkImportPath = frameworkPath || `@storybook/${framework}`;

        const previewOrConfigFile = loadPreviewOrConfigFile({ configDir });
        const presetEntries = await presets.apply('config', [], options);
        const configEntries = [...presetEntries, previewOrConfigFile].filter(
            Boolean
        );

        const storyEntries = (
            await Promise.all(
                (
                    await presets.apply('stories')
                ).map((g) =>
                    glob(path.isAbsolute(g) ? g : path.join(configDir, g))
                )
            )
        ).reduce((carry, stories) => carry.concat(stories), []);

        const absoluteFilesToImport = (files, name) =>
            files
                .map(
                    (el, i) =>
                        `import ${
                            name ? `* as ${name}_${i} from ` : ''
                        }'/@fs/${normalizePath(el)}'`
                )
                .join('\n');

        const importArray = (name, length) =>
            `[${new Array(length)
                .fill(0)
                .map((_, i) => `${name}_${i}`)
                .join(',')}]`;

        const code = `
    import { configure } from '${frameworkImportPath}';
    /* ${previewEntries
        .map((entry) => `// preview entry\nimport '${entry}';`)
        .join('\n')} */

    import { addDecorator, addParameters, addLoader, addArgTypesEnhancer, addArgsEnhancer } from '@storybook/client-api';
    import { logger } from '@storybook/client-logger';
    ${absoluteFilesToImport(configEntries, 'config')}
    ${absoluteFilesToImport(storyEntries, 'story')}
      
    const configs = ${importArray('config', configEntries.length)}
    configs.forEach(config => {
      Object.keys(config).forEach((key) => {
        const value = config[key];
        switch (key) {
          case 'args':
          case 'argTypes': {
            return logger.warn('Invalid args/argTypes in config, ignoring.', JSON.stringify(value));
          }
          case 'decorators': {
            return value.forEach((decorator) => addDecorator(decorator, false));
          }
          case 'loaders': {
            return value.forEach((loader) => addLoader(loader, false));
          }
          case 'parameters': {
            return addParameters({ ...value }, false);
          }
          case 'argTypesEnhancers': {
            return value.forEach((enhancer) => addArgTypesEnhancer(enhancer));
          }
          case 'argsEnhancers': {
            return value.forEach((enhancer) => addArgsEnhancer(enhancer))
          }
          case 'globals':
          case 'globalTypes': {
            const v = {};
            v[key] = value;
            return addParameters(v, false);
          }
          case 'decorateStory':
          case 'renderToDOM': {
            return null; // This key is not handled directly in v6 mode.
          }
          default: {
            // eslint-disable-next-line prefer-template
            return console.log(key + ' was not supported :( !');
          }
        }
      });
    })
    
    /* TODO: not quite sure what to do with this, to fix HMR
    if (import.meta.hot) {
        import.meta.hot.accept();    
    }
    */
    
    configure(() => ${importArray(
        'story',
        storyEntries.length
    )}.filter(el => el.default), { hot: import.meta.hot }, false); // not sure if the import.meta.hot thing is correct
    `.trim();
        return code;
    };
