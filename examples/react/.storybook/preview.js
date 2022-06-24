export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const argTypes = { globalArg: { options: ['A', 'B'], control: 'select' } };

export const args = { globalArg: 'A' };
