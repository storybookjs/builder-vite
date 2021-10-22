module.exports.transformIframeHtml = async function transformIframeHtml(
    html,
    { title, framework, presets }
) {
    const headHtmlSnippet = await presets.apply('previewHead');
    const bodyHtmlSnippet = await presets.apply('previewBody');
    const logLevel = await presets.apply('logLevel', undefined);
    const frameworkOptions = await presets.apply(`${framework}Options`, {});
    const features = await presets.apply('features', {});
    return html
        .replace('<!-- [TITLE HERE] -->', title || 'Storybook')
        .replace('[LOGLEVEL HERE]', logLevel)
        .replace(
            `'[FRAMEWORK_OPTIONS HERE]'`,
            JSON.stringify(frameworkOptions || {})
        )
        .replace(`'[FEATURES HERE]'`, JSON.stringify(features || {}))
        .replace('<!-- [HEAD HTML SNIPPET HERE] -->', headHtmlSnippet || '')
        .replace('<!-- [BODY HTML SNIPPET HERE] -->', bodyHtmlSnippet || '');
};
