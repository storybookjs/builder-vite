# Storybook builder for Vite

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

### Usage

In your `main.js` configuration file,
set `core: { builder: "storybook-builder-vite" }`.

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
}
```

The `viteFinal` function will give you `config` which is
the builder's own Vite config. You can tweak this as you want,
for example to set up aliases, add new plugins etc.

The `configType` variable will be either `"DEVELOPMENT"` or `"PRODUCTION"`.

The function should return the updated Vite configuration.

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

You need npm 7 or newer, because the project is organized as npm workspaces.
This lets you write new code in the core builder package, and instantly use them from
the example packages.
