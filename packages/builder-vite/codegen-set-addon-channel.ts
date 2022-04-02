export function generateAddonSetupCode() {
  return `
    import global from 'global';
    import createPostMessageChannel from '@storybook/channel-postmessage';
    import createWebSocketChannel from '@storybook/channel-websocket';
    import { addons } from '@storybook/addons';

    const channel = createPostMessageChannel({ page: 'preview' });
    addons.setChannel(channel);
    window.__STORYBOOK_ADDONS_CHANNEL__ = channel;

    const { SERVER_CHANNEL_URL } = global;
    if (SERVER_CHANNEL_URL) {
      const serverChannel = createWebSocketChannel({ url: SERVER_CHANNEL_URL });
      addons.setServerChannel(serverChannel);
      window.__STORYBOOK_SERVER_CHANNEL__ = serverChannel;
    }
  `.trim();
}
