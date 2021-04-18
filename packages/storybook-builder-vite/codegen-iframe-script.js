const path = require('path');
const glob = require('glob-promise');
const { loadPreviewOrConfigFile } = require('@storybook/core-common');

// This is somewhat of a hack; the problam is that previewEntries resolves to
// the CommonJS imports, probably because require.resolve in Node.js land leads
// to that. For Vite, we need the ESM modules.
function replaceCJStoESMPath(entryPath) {
    return entryPath.replace('/cjs/', '/esm/');
}

module.exports.generateIframeScriptCode = async function generateIframeScriptCode(
    options
) {
    const { presets, configDir, framework } = options;

    const previewEntries = (
        await presets.apply('previewEntries', [], options)
    ).map(replaceCJStoESMPath);
    const configEntries = [loadPreviewOrConfigFile({ configDir })]
        .concat(await presets.apply('config', [], options))
        .filter(Boolean);
    const storyEntries = (
        await Promise.all(
            (await presets.apply('stories')).map((g) =>
                glob(path.isAbsolute(g) ? g : path.join(configDir, g))
            )
        )
    ).reduce((carry, stories) => carry.concat(stories), []);

    const absoluteFilesToImport = (files, name) =>
        files
            .map(
                (el, i) =>
                    `import ${name ? `* as ${name}_${i} from ` : ''}'/@fs${el}'`
            )
            .join('\n');

    const importArray = (name, length) =>
        `[${new Array(length)
            .fill(0)
            .map((_, i) => `${name}_${i}`)
            .join(',')}]`;

    const code = `
    import 'vite/dynamic-import-polyfill';
  
    /* ${previewEntries
        .map((entry) => `// preview entry\nimport '${entry}';`)
        .join('\n')} */
  
    import { addDecorator, addParameters, addLoader, addArgTypesEnhancer } from '@storybook/client-api';
    import { logger } from '@storybook/client-logger';
    ${absoluteFilesToImport(configEntries, 'config')}
    import { configure } from '@storybook/${framework}';
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
          case 'globals':
          case 'globalTypes': {
            const v = {};
            v[key] = value;
            return addParameters(v, false);
          }
          default: {
            // eslint-disable-next-line prefer-template
            return console.log(key + ' was not supported :( !');
          }
        }
      });
    })
    
    if (import.meta.hot) {
        import.meta.hot.accept();    
    }
    
    configure(() => ${importArray(
        'story',
        storyEntries.length
    )}.filter(el => el.default), { hot: import.meta.hot }, false);
    `.trim();
    return code;
};
