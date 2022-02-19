
export async function plugins(options: any) {
  const { framework, presets } = options;
  const svelteOptions = await presets.apply('svelteOptions', {}, options);

  if (framework === 'svelte') {
    return [require('@sveltejs/vite-plugin-svelte').svelte(svelteOptions), require('./csf-plugin').default(svelteOptions)];

  }

  return [];
}
