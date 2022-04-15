import type { Plugin } from 'vite';

/**
 * This plugin is a workaround to inject some styles into the `<head>` of the iframe to
 * prevent the "no story" text from appearing breifly while the page loads in.
 *
 * It can be removed, and these styles placed back into the head,
 * when https://github.com/vitejs/vite/issues/6737 is closed.
 */
export function noFouc(): Plugin {
  return {
    name: 'no-fouc',
    enforce: 'post',
    async transformIndexHtml(html, ctx) {
      if (ctx.path !== '/iframe.html') {
        return;
      }

      return insertHeadStyles(html);
    },
  };
}

function insertHeadStyles(html: string) {
  return html.replace(
    '</head>',
    `
  <style>
    /* Fix for elements flashing */
    body > * {
      display: none !important;
    }
    .sb-show-preparing-story > .sb-preparing-story,
    .sb-show-preparing-docs > .sb-preparing-docs,
    .sb-show-nopreview > .sb-nopreview,
    .sb-show-errordisplay > .sb-errordisplay,
    .sb-show-main > #root,
    .sb-show-main > #docs-root {
      display: block !important;
    }
    #root[hidden],
    #docs-root[hidden] {
      display: none !important;
    }
  </style>
</head>
  `.trim()
  );
}
