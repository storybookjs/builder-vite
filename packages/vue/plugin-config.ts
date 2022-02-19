export async function plugins(options: any) {
  const { framework } = options;

  if (framework === 'vue' || framework === 'vue3') {
    return [require('@vitejs/plugin-vue')(), require('./docgen-plugin').vueDocgen()];

  }

  return [];
}
