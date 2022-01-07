import type { CoreConfig } from '@storybook/core-common';
import type { ExtendedOptions } from './types';

export type PreviewHtml = string | undefined;

export async function transformIframeHtml(
  html: string,
  { configType, features, framework, presets, serverChannelUrl, title }: ExtendedOptions
) {
  const headHtmlSnippet = await presets.apply<PreviewHtml>('previewHead');
  const bodyHtmlSnippet = await presets.apply<PreviewHtml>('previewBody');
  const logLevel = await presets.apply('logLevel', undefined);
  const frameworkOptions = await presets.apply(`${framework}Options`, {});
  const coreOptions = await presets.apply<CoreConfig>('core');

  return html
    .replace('<!-- [TITLE HERE] -->', title || 'Storybook')
    .replace('[CONFIG_TYPE HERE]', configType || '')
    .replace('[LOGLEVEL HERE]', logLevel || '')
    .replace(`'[FRAMEWORK_OPTIONS HERE]'`, JSON.stringify(frameworkOptions || {}))
    .replace(
      `'[CHANNEL_OPTIONS HERE]'`,
      JSON.stringify(coreOptions && coreOptions.channelOptions ? coreOptions.channelOptions : {})
    )
    .replace(`'[FEATURES HERE]'`, JSON.stringify(features || {}))
    .replace(`'[SERVER_CHANNEL_URL HERE]'`, JSON.stringify(serverChannelUrl))
    .replace('<!-- [HEAD HTML SNIPPET HERE] -->', headHtmlSnippet || '')
    .replace('<!-- [BODY HTML SNIPPET HERE] -->', bodyHtmlSnippet || '');
}
