# Storybook builder for Vite <!-- omit in toc -->

Build your stories with [vite](https://vitejs.dev/) for fast startup times and near-instant HMR.

**Note:** This Repository is for Storybook 6.4 and 6.5. In Storybook 7, the Vite builder was brought into the main Storybook monorepo (https://github.com/storybookjs/storybook). See https://storybook.js.org/blog/first-class-vite-support-in-storybook/ for details.

# Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
  - [Getting started with Vite and Storybook (on a new project)](#getting-started-with-vite-and-storybook-on-a-new-project)
  - [Migration from webpack / CRA](#migration-from-webpack--cra)
  - [Customize Vite config](#customize-vite-config)
  - [Svelte Customization](#svelte-customization)
  - [TypeScript](#typescript)
  - [React Docgen](#react-docgen)
  - [Note about working directory](#note-about-working-directory)
- [Known issues](#known-issues)
- [Migration from storybook-builder-vite](#migration-from-storybook-builder-vite)
- [Contributing](#contributing)
  - [About this codebase](#about-this-codebase)

## Installation

Requirements:

- Vite 4.0 or newer (for Vite v3, use `@storybook/builder-vite@0.2.x`)
- Storybook 6.4 or 6.5 (for storybook 7, see https://github.com/storybookjs/storybook/tree/next/code/lib/builder-vite)

```bash
npm install @storybook/builder-vite --save-dev
```

or

```bash
yarn add --dev @storybook/builder-vite
```

or

```bash
pnpm add --save-dev @storybook/builder-vite
```

Note: when using `pnpm`, you may need to enable [shamefully-hoist](https://pnpm.io/npmrc#shamefully-hoist), until https://github.com/storybookjs/builder-vite/issues/55 can be fixed.

## Usage

In your `main.js` configuration file,
set `core: { builder: "@storybook/builder-vite" }`.

> For autoreload of react stories to work, they need to have a `.stories.tsx` or `.stories.jsx` file suffix.
> See also [#53](https://github.com/storybookjs/builder-vite/pull/53)

The builder supports both development mode in Storybook, and building a static production version.

### Getting started with Vite and Storybook (on a new project)

See https://vitejs.dev/guide/#scaffolding-your-first-vite-project,

```
npm create vite@latest # follow the prompts
npx sb init --builder @storybook/builder-vite && npm run storybook
```

### Migration from webpack / CRA

1. Install `vite` and `@storybook/builder-vite`
2. Remove any explicit project dependencies on `webpack`, `react-scripts`, and any other webpack plugins or loaders.
3. If you were previously using `@storybook/manager-webpack5`, you'll need to remove it, since currently the vite builder only works with `manager-webpack4`, which is the default and does not need to be installed manually. Also remove `@storybook/builder-webpack5` or `@storybook/builder-webpack4` if they are installed.
4. Set `core: { builder: "@storybook/builder-vite" }` in your `.storybook/main.js` file.
5. Remove storybook webpack cache (`rm -rf node_modules/.cache`)
6. Update your `/public/index.html` file for vite (be sure there are no `%PUBLIC_URL%` inside it, which is a CRA variable)
7. Be sure that any files containing JSX syntax use a `.jsx` or `.tsx` file extension, which [vite requires](https://vitejs.dev/guide/features.html#jsx). This includes `.storybook/preview.jsx` if it contains JSX syntax.
8. If you are using `@storybook/addon-interactions`, for now you'll need to add a [workaround](https://github.com/storybookjs/storybook/issues/18399) for jest-mock relying on the node `global` variable by creating a `.storybook/preview-head.html` file containing the following:

```html
<script>
  window.global = window;
</script>
```

9.  Start up your storybook using the same `yarn storybook` or `npm run storybook` commands you are used to.

For other details about the differences between vite and webpack projects, be sure to read through the [vite documentation](https://vitejs.dev/).

### Customize Vite config

The builder will _not_ read your `vite.config.js` file by default.

In `.storybook/main.js` (or whatever your Storybook config file is named)
you can override the Vite config:

```javascript
// use `mergeConfig` to recursively merge Vite options
const { mergeConfig } = require('vite');

module.exports = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: { foo: 'bar' },
      },
    });
  },
  // ... other options here
};
```

The `viteFinal` function will give you `config` which is
the builder's own Vite config. You can tweak this as you want,
for example to set up aliases, add new plugins etc.

The `configType` variable will be either `"DEVELOPMENT"` or `"PRODUCTION"`.

The function should return the updated Vite configuration.

### Svelte Customization

When using this builder with Svelte, your `svelte.config.js` file will be used automatically.

If you need to make overrides for Storybook, your `.storybook/main.js` (or equivalent)
can contain a `svelteOptions` object to pass custom options to
[`vite-plugin-svelte`](https://github.com/sveltejs/vite-plugin-svelte/tree/main/packages/vite-plugin-svelte):

```javascript
const preprocess = require('svelte-preprocess');

module.exports = {
  svelteOptions: {
    preprocess: preprocess({
      typescript: true,
      postcss: true,
      sourceMap: true,
    }),
  },
};
```

### TypeScript

Configure your `.storybook/main.ts` to use TypeScript:

```typescript
import type { StorybookViteConfig } from '@storybook/builder-vite';

const config: StorybookViteConfig = {
  // other storybook options...,
  async viteFinal(config, options) {
    // modify and return config
  },
};

export default config;
```

Or alternatively, you can use named exports:

```typescript
import type { ViteFinal } from '@storybook/builder-vite';

export const viteFinal: ViteFinal = async (config, options) => {
  // modify and return config
};
```

See [Customize Vite config](#customize-vite-config) for details about using `viteFinal`.

### React Docgen

Docgen is used in Storybook to populate the props table in docs view, the controls panel, and for several other addons. Docgen is supported in vue and react, and there are two docgen options when using react, `react-docgen` and `react-docgen-typescript`. You can learn more about the pros/cons of each in [this gist](https://gist.github.com/shilman/036313ffa3af52ca986b375d90ea46b0). By default, if we find a `typescript` dependency in your `package.json` file, we will assume you're using typescript and will choose `react-docgen-typescript`. You can change this by setting the `typescript.reactDocgen` option in your `.storybook/main.js` file:

```javascript
module.exports = {
  typescript: {
    reactDocgen: 'react-docgen`
  }
}
```

If you're using TypeScript, we encourage you to experiment and see which option works better for your project.

### Note about working directory

The builder will by default enable Vite's [server.fs.strict](https://vitejs.dev/config/#server-fs-strict)
option, for increased security. The default project `root` is set to the parent directory of the
storybook configuration directory. This can be overridden in viteFinal.

## Known issues

- HMR: saving a story file does not hot-module-reload, a full reload happens instead. HMR works correctly when saving component files.

## Migration from storybook-builder-vite

This project has moved from `storybook-builder-vite` to `@storybook/builder-vite` as part of a larger effort to improve Vite support in Storybook. To automatically migrate your existing project, you can run

```bash
npx sb@next automigrate
```

To manually migrate:

1. Remove `storybook-builder-vite` from your `package.json` dependencies
2. Install `@storybook/builder-vite`
3. Update your `core.builder` setting in `.storybook/main.js` to `@storybook/builder-vite`.

## Contributing

The Vite builder cannot build itself.
Are you willing to contribute? We are especially looking for vue and svelte experts, as the current maintainers are react users.

https://github.com/storybookjs/builder-vite/issues/11

Have a look at the GitHub issues for known bugs. If you find any new bugs,
feel free to create an issue or send a pull request!

Please read the [How to contribute](/CONTRIBUTING.md) guide.

### About this codebase

The code is a monorepo with the core `@storybook/builder-vite` package,
and examples (like `examples/react`) to test the builder implementation.

Similar to the main storybook monorepo, you need yarn to develop this builder, because the project is organized as yarn workspaces.
This lets you write new code in the core builder package, and instantly use them from
the example packages.
