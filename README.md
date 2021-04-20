# Storybook builder for Vite

NB! This code is still very experimental! Have a look at the GitHub issues
for known bugs. If you find any new bugs, feel free to create an issue
or send a pull request!

### Installation

```bash
npm install storybook-builder-vite --save-dev
```

### Usage

In your `main.js` configuration file,
set `core: { builder: "storybook-builder-vite" }`.

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
