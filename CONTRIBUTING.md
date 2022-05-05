# How to contribute

We love getting contributions! If you'd like to work on fixing a bug or adding a feature, read through our [architecture](/architecture.md) guide to get an overview of how the builder is structured. The rest of this guide will cover the basics of setting up, developing, and testing the vite builder.

## About this codebase

The code is a monorepo with the core `@storybook/builder-vite` package,
and examples (like `examples/react`) to test the builder implementation.

Similar to the main storybook monorepo, you need yarn to develop this builder, because the project is organized as yarn workspaces.
This lets you write new code in the core builder package, and instantly use them from
the example packages.

## Prerequisites

- [Node.js][n] 16+;
- [Git][g];
- IDE.

[n]: https://nodejs.org/
[g]: https://git-scm.com/

## Setup

1. [Fork][f] the Storybook builder vite repository.

   [f]: https://docs.github.com/en/get-started/quickstart/fork-a-repo

2. Clone forked repository:

   ```
   git clone https://github.com/YOUR_USERNAME/builder-vite
   cd builder-vite
   ```

3. Install dependencies:

   ```
   yarn
   ```

## Development

### Creating a branch

```
git checkout -b name-of-your-contribution
```

### Start

Watch for changes in TypeScript files:

```
yarn start
```

### Run Storybook example

In another Terminal run:

```
yarn example:NAME
```

Where `NAME` is based on `examples/*` directories.

For Vue:

```
yarn example:vue
```

### Lint

Run before committing changes:

```
yarn lint
```
