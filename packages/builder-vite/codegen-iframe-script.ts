import { normalizePath } from 'vite';
import { virtualPreviewFile, virtualStoriesFile, virtualAddonSetupFile } from './virtual-file-names';

import type { ExtendedOptions } from './types';

export async function generateIframeScriptCode(options: ExtendedOptions) {
  const { presets } = options;

  const presetEntries = await presets.apply('config', [], options);
  const configEntries = [...presetEntries].filter(Boolean);

  const absoluteFilesToImport = (files: string[], name: string) =>
    files.map((el, i) => `import ${name ? `* as ${name}_${i} from ` : ''}'/@fs/${normalizePath(el)}'`).join('\n');

  const importArray = (name: string, length: number) => new Array(length).fill(0).map((_, i) => `${name}_${i}`);

  // noinspection UnnecessaryLocalVariableJS
  /** @todo Inline variable and remove `noinspection` */
  // language=JavaScript
  const code = `
    import '${virtualAddonSetupFile}';
    import {
      addDecorator,
      addParameters,
      addLoader,
      addArgTypesEnhancer,
      addArgsEnhancer
    } from '@storybook/client-api';
    import { logger } from '@storybook/client-logger';
    ${absoluteFilesToImport(configEntries, 'config')}
    import * as preview from '${virtualPreviewFile}';
    // This import should occur after the config imports above
    import { configStories } from '${virtualStoriesFile}';

    const configs = [${importArray('config', configEntries.length).concat('preview.default').join(',')}].filter(Boolean)

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

    configStories();
    `.trim();
  return code;
}
