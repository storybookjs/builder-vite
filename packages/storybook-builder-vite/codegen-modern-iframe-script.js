const { loadPreviewOrConfigFile } = require('@storybook/core-common');
const { normalizePath } = require('vite');

module.exports.generateModernIframeScriptCode =
    async function generateModernIframeScriptCode(options, { storiesFilename }) {
        const { presets, configDir } = options;

        const previewOrConfigFile = loadPreviewOrConfigFile({ configDir });
        const presetEntries = await presets.apply('config', [], options);
        const configEntries = [...presetEntries, previewOrConfigFile].filter(
            Boolean
        ).map(configEntry => `/@fs/${normalizePath(configEntry)}`);

        /**
         * This code is largely taken from https://github.com/storybookjs/storybook/blob/d1195cbd0c61687f1720fefdb772e2f490a46584/lib/builder-webpack4/src/preview/virtualModuleModernEntry.js.handlebars
         * Some small tweaks were made to `getProjectAnnotations` (since `import()` needs to be resolved asynchronously)
         * and the HMR implementation has been tweaked to work with Vite.
         */
        const code = `
    import fetch from 'unfetch';
    import global from 'global';
    
    import { composeConfigs, PreviewWeb } from '@storybook/preview-web';    
    import { ClientApi } from '@storybook/client-api';    
    import { addons } from '@storybook/addons';
    import createPostMessageChannel from '@storybook/channel-postmessage';
    import createWebSocketChannel from '@storybook/channel-websocket';
    
    import { importFn } from '${storiesFilename}';
    
    const { SERVER_CHANNEL_URL } = global;
    
    const getProjectAnnotations = async () =>
      composeConfigs(await Promise.all([${configEntries.map(configEntry => `import('${configEntry}')`).join(',\n')}]));
    
    const channel = createPostMessageChannel({ page: 'preview' });
    addons.setChannel(channel);
    
    if (SERVER_CHANNEL_URL) {
      const serverChannel = createWebSocketChannel({ url: SERVER_CHANNEL_URL, });
      addons.setServerChannel(serverChannel);
      window.__STORYBOOK_SERVER_CHANNEL__ = serverChannel;
    }
    
    const preview = new PreviewWeb();
    
    window.__STORYBOOK_PREVIEW__ = preview;
    window.__STORYBOOK_STORY_STORE__ = preview.storyStore;
    window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
    window.__STORYBOOK_CLIENT_API__ = new ClientApi({ storyStore: preview.storyStore });
    
    preview.initialize({ importFn, getProjectAnnotations });
    
    if (import.meta.hot) {
        import.meta.hot.accept('${storiesFilename}', (newModule) => {

        // importFn has changed so we need to patch the new one in
        preview.onStoriesChanged({ importFn: newModule.importFn });
        });
  
      import.meta.hot.accept(${JSON.stringify(configEntries)}, ([...newConfigEntries]) => {
        const newGetProjectAnnotations =  () => composeConfigs(newConfigEntries);

        // getProjectAnnotations has changed so we need to patch the new one in
        preview.onGetProjectAnnotationsChanged({ getProjectAnnotations: newGetProjectAnnotations });
      });
    }
    `.trim();
        return code;
    };
