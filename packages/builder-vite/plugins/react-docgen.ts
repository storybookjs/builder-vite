import {
  parse,
  handlers as docgenHandlers,
  resolver as docgenResolver,
  importers as docgenImporters,
} from 'react-docgen';
import type { DocumentationObject } from 'react-docgen/lib/Documentation';
import type { Plugin } from 'vite';
import actualNameHandler from './docgen-handlers/actualNameHandler';

type DocObj = DocumentationObject & { actualName: string };

// TODO: None of these are able to be overridden, so `default` is aspirational here.
const defaultHandlers = Object.values(docgenHandlers).map((handler) => handler);
const defaultResolver = docgenResolver.findAllExportedComponentDefinitions;
const defaultImporter = docgenImporters.makeFsImporter();
const handlers = [...defaultHandlers, actualNameHandler];

export function reactDocgen(): Plugin {
  return {
    name: 'react-docgen',
    enforce: 'pre',
    async transform(src: string, id: string) {
      if (/\.(mjs|tsx|jsx)$/.test(id)) {
        try {
          // Since we're using `findAllExportedComponentDefinitions`, this will always be an array.
          const docgenResults = parse(src, defaultResolver, handlers, { importer: defaultImporter, filename: id }) as
            | DocObj[];
          let extendedSrc = src;

          docgenResults.forEach((info) => {
            const { actualName, ...docgenInfo } = info;
            if (actualName) {
              const docNode = JSON.stringify(docgenInfo);
              extendedSrc = `${extendedSrc};${actualName}.__docgenInfo=${docNode}`;
            }
          });

          return extendedSrc;
        } catch (e) {
          // Usually this is just an error from react-docgen that it couldn't find a component
          // Only uncomment for troubleshooting
          // console.error(e);
        }
      }
    },
  };
}
