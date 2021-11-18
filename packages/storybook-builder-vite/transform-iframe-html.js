module.exports.transformIframeHtml = async function transformIframeHtml(
    html,
    { configType, features, framework, presets, serverChannelUrl, title }
) {
    const headHtmlSnippet = await presets.apply('previewHead');
    const bodyHtmlSnippet = await presets.apply('previewBody');
    const logLevel = await presets.apply('logLevel', undefined);
    const frameworkOptions = await presets.apply(`${framework}Options`, {});
    const coreOptions = await presets.apply('core');

    return html
        .replace('<!-- [TITLE HERE] -->', title || 'Storybook')
        .replace('[CONFIG_TYPE HERE]', configType)
        .replace('[LOGLEVEL HERE]', logLevel)
        .replace(
            `'[FRAMEWORK_OPTIONS HERE]'`,
            JSON.stringify(frameworkOptions || {})
        )
        .replace(`'[CHANNEL_OPTIONS HERE]'`, JSON.stringify(coreOptions && coreOptions.channelOptions ? coreOptions.channelOptions : {}))
        .replace(`'[FEATURES HERE]'`, JSON.stringify(features || {}))
        .replace(`'[SERVER_CHANNEL_URL HERE]'`, JSON.stringify(serverChannelUrl))
        .replace('<!-- [HEAD HTML SNIPPET HERE] -->', headHtmlSnippet || '')
        .replace('<!-- [BODY HTML SNIPPET HERE] -->', bodyHtmlSnippet || '');
};
