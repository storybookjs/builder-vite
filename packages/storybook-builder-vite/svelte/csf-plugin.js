const {
    getNameFromFilename,
} = require('@storybook/addon-svelte-csf/dist/cjs/parser/svelte-stories-loader');
const { readFileSync } = require('fs');
const {
    extractStories,
} = require('@storybook/addon-svelte-csf/dist/cjs/parser/extract-stories');
const parser = require
    .resolve('@storybook/addon-svelte-csf/dist/esm/parser/collect-stories')
    .replace(/[/\\]/g, '/');

module.exports = {
    name: 'storybook-addon-svelte-csf',
    enforce: 'post',
    transform(code, id) {
        if (/.stories.svelte/.test(id)) {
            const component = getNameFromFilename(id);
            const source = readFileSync(id).toString();
            const all = extractStories(source);
            const { stories } = all;
            const storyDef = Object.entries(stories)
                .filter(([, def]) => !def.template)
                .map(
                    ([id]) =>
                        `export const ${id} = __storiesMetaData.stories[${JSON.stringify(
                            id
                        )}];`
                )
                .join('\n');

            const codeWithoutDefaultExport = code.replace(
                'export default ',
                '// export default '
            );

            const namedExportsOrder = Object.entries(stories)
                .filter(([, def]) => !def.template)
                .map(([id]) => id);

            const output = [
                codeWithoutDefaultExport,
                `import parser from '${parser}';`,
                `const __storiesMetaData = parser(${component}, ${JSON.stringify(
                    all
                )});`,
                'export default __storiesMetaData.meta;',
                `export const __namedExportsOrder = ${JSON.stringify(
                    namedExportsOrder
                )};`,
                storyDef,
            ].join('\n');
            return {
                code: output,
            };
        }
    },
};
