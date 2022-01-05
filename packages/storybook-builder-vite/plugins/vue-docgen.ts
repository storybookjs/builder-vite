import { parse } from 'vue-docgen-api';

export default function () {
  return {
    name: 'vue-docgen',

    async transform(src, id) {
      if (/\.(vue)$/.test(id)) {
        const metaData = await parse(id);
        const metaSource = JSON.stringify(metaData);

        return `${src};_sfc_main.__docgenInfo = ${metaSource}`;
      }
    },
  };
}
