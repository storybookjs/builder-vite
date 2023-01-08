import { parse } from 'vue-docgen-api';
import type { Plugin } from 'vite';
import MagicString from 'magic-string';

export function vueDocgen(vueVersion: 2 | 3): Plugin {
  return {
    name: 'vue-docgen',

    async transform(src: string, id: string) {
      if (/\.vue$/.test(id) && !/\.stories\.vue$/.test(id)) {
        const metaData = await parse(id);
        const metaSource = JSON.stringify(metaData);
        const s = new MagicString(src);
        const componentLocation = vueVersion === 3 ? '_sfc_main' : '__component__.exports';
        s.append(`;${componentLocation}.__docgenInfo = ${metaSource}`);

        return {
          code: s.toString(),
          map: s.generateMap({ hires: true, source: id }),
        };
      }
    },
  };
}
