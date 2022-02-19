import { TypescriptConfig } from '@storybook/core-common';

type ReactOptions =  {
  fastRefresh?: boolean;
};

export async function plugins(options: any) {
  const { framework, presets } = options;
  const reactOptions = await presets.apply('reactOptions', {}  as ReactOptions, options);
  const { reactDocgen, reactDocgenTypescriptOptions } = await presets.apply('typescript', {} as TypescriptConfig, options);
  if (framework === 'react') {
    const plugins = [
      require('@vitejs/plugin-react')({
        // Do not treat story files as HMR boundaries, storybook itself needs to handle them.
        exclude: [/\.stories\.([tj])sx?$/, /node_modules/],
        fastRefresh: reactOptions?.fastRefresh
      })
    ];

    let typescriptPresent;

    try {
      require.resolve('typescript');
      typescriptPresent = true;
    } catch (e) {
      typescriptPresent = false;
    }

    if (reactDocgen === 'react-docgen-typescript' && typescriptPresent) {
      plugins.push(require('@joshwooding/vite-plugin-react-docgen-typescript').default(reactDocgenTypescriptOptions));
    }

    return plugins;
  }

  return [];
}
