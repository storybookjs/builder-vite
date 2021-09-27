# Storybook builder for Vite

Requirements:

-   Vite 2.5 or newer

NB! This code is still very experimental! Have a look at the GitHub issues
for known bugs. If you find any new bugs, feel free to create an issue
or send a pull request!

## More maintainers needed!

The Vite builder cannot build itself.
Are you willing to contribute?

https://github.com/eirslett/storybook-builder-vite/issues/11

### Installation

```bash
npm install storybook-builder-vite --save-dev
```

or

```bash
yarn add --dev storybook-builder-vite
```

### Usage

In your `main.js` configuration file,
set `core: { builder: "storybook-builder-vite" }`.

> For autoreload of stories to work, they need to have `.stories.tsx` file suffix.
> See also [#53](https://github.com/eirslett/storybook-builder-vite/pull/53)

The builder supports both development mode in Storybook, and building a static production version.

### Customize Vite config

The builder will _not_ read your `vite.config.js` file by default.

In `.storybook/main.js` (or whatever your Storybook config file is named)
you can override the Vite config:

```javascript
module.exports = {
    async viteFinal(config, { configType }) {
        // customize the Vite config here
        config.resolve.alias.foo = 'bar';

        // return the customized config
        return config;
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

When using this builder with Svelte, your `.storybook/main.js` (or equivalent)
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

## Note about working directory

The builder will by default enable Vite's [server.fs.strict](https://vitejs.dev/config/#server-fs-strict)
option, for increased security. The default project `root` is set to the parent directory of the
storybook configuration directory. This can be overridden in viteFinal.

### Getting started with React, Vite and Storybook (on a new project)

```
npm init @vitejs/app vite-react-app --template react && cd vite-react-app
npm install # or yarn
npx sb@next init --builder storybook-builder-vite && npm run storybook
```

## Contributing

Contributions are welcome!

### About this codebase

The code is a monorepo with the core `storybook-builder-vite` package,
and examples (like `packages/example-react`) to test the builder implementation with.

Similar to the main storybook monorepo, you need yarn , because the project is organized as yarn workspaces.
This lets you write new code in the core builder package, and instantly use them from
the example packages.
