module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['@typescript-eslint', 'only-warn'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  rules: {
    // Set line length to 120
    'max-len': ['error', { code: 120, ignoreComments: true }],
    // Ignore arguments starting from an underscore `_`
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
  overrides: [
    // Fix: disable `no-unused-vars` for TypeScript files
    {
      files: '**/*.ts',
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
};
