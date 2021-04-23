module.exports.mockCoreJs = function mockCoreJs() {
    return {
        name: 'mock-core-js',
        resolveId(id) {
            if (id.includes('node_modules/core-js')) {
                return id;
            }
            return undefined;
        },
        load(id) {
            if (id.includes('node_modules/core-js')) {
                return '';
            }
            return undefined;
        },
    };
};
