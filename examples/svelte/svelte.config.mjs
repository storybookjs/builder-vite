import preprocess from 'svelte-preprocess';

/**
 * This is an example of a config that might be used in a sveltekit app,
 * but it's not actually used in this example.  It serves to ensure that
 * we aren't accidentally merging this config, as @sveltejs/vite-plugin-svelte
 * began to do by default.
 */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // Override http methods
    methodOverride: {
      allowed: ['PATCH', 'DELETE'],
    },
  },
};

export default config;
