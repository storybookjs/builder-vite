# How to contribute

## Prerequisites

- [Node.js][n] 16+;
- [Git][g];
- IDE.

[n]: https://nodejs.org/
[g]: https://git-scm.com/

### Optional

- [Docker Desktop][d].

[d]: https://www.docker.com/products/docker-desktop

## Setup

1. [Fork][f] the Storybook builder vite repository.

   [f]: https://docs.github.com/en/get-started/quickstart/fork-a-repo

2. Clone forked repository:

   ```
   git clone https://github.com/YOUR_USERNAME/storybook-builder-vite
   cd storybook-builder-vite
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

Where `NAME` is based on a `packages/example-*` directory.

For Vue:

```
yarn example:vue
```

### Lint

Run before committing changes:

```
yarn lint
```

## Docker

Optionally, we're using Docker Compose for running code as service in an isolated GNU/Linux environment.

For exit from a running service you need press <kbd>Ctrl</kbd> + <kbd>C</kbd> or <kbd>⌘</kbd> + <kbd>C</kbd>.

### Run Storybook example in Docker

You need run `yarn start` first, then in another Terminal run:

```
yarn docker:NAME
```

Where `NAME` is based on a `packages/example-*` directory.

For Vue:

```
yarn docker:vue
```

### CI

The Build Examples GitHub Workflow emulation:

```
yarn ci
```

#### CI with parallel Storybook building

Faster, but impossible to debug:

```
yarn ci:parallel
```

Use only if your Docker Desktop has runtime memory limit set to >= 4GB.

### Down

Used to force stop and remove containers, images, networks and volumes:

```
yarn down
```

It's OK to use this command, because all will be recreated on next run.

After using the down you need more time to start, because `node_modules` was cleaned.
