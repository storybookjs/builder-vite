import { parse } from 'vue-docgen-api';

export function vueDocgen() {
  return {
    name: 'vue-docgen',

    async transform(src: string, id: string) {
      if (/\.(vue)$/.test(id)) {
        const metaData = await parse(id);
        const metaSource = JSON.stringify(metaData);

        return `${src};_sfc_main.__docgenInfo = ${metaSource}`;
      }
    },
  };
}
