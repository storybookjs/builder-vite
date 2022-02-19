export type PluginConfigType = 'build' | 'development';

export async function plugins(options: any, _type: PluginConfigType) {
  const { framework } = options;

  if (framework === 'glimmerx') {
    return [require('vite-plugin-glimmerx/index.cjs').default()];
  }

  return [];
}
