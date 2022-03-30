# How to contribute

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
