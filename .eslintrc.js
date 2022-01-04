module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['only-warn'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  rules: {
    // Prevent warnings when debugging
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    // Fix: import and export, see https://github.com/AtomLinter/linter-eslint/issues/462
    // TODO: Remove temporary fix after adding `plugin:@typescript-eslint/eslint-recommended`
    {
      files: 'packages/example-*/**/*.*',
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
};
