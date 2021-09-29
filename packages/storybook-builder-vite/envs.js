const { stringifyEnvs } = require('@storybook/core-common')

/**
* Customized version of stringifyProcessEnvs from @storybook/core-common which
* uses import.meta.env instead of process.env
*/
module.exports.stringifyProcessEnvs = function stringifyProcessEnvs(raw) {
  const envs = Object.entries(raw).reduce(
    (acc, [key, value]) => {
      acc[`import.meta.env.${key}`] = JSON.stringify(value);
      return acc;
    },
    {
      // Default fallback
      'process.env.XSTORYBOOK_EXAMPLE_APP': '""',
    }
  );
  // support destructuring like
  // const { foo } = import.meta.env;
  envs['import.meta.env'] = JSON.stringify(stringifyEnvs(raw));
  return envs;
}
