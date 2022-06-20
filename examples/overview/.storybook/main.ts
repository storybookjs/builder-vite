import path from 'path';
import { getPackagesInfo, OVERVIEW_BASE, withOverview } from '../../../scripts/build-utils';
import pkg from '../package.json';

const refs = getPackagesInfo()
  // @ts-ignore
  .filter((item) => !!item.packageJson.pages && item.packageJson.name !== pkg.name)
  .reduce<
    Record<
      string,
      {
        title: string;
        url: string;
      }
    >
  >((prev, current) => {
    const baseName = current?.path?.split('/').pop();
    if (!baseName) {
      return prev;
    }
    prev[baseName] = {
      title: baseName,
      url: path.join(OVERVIEW_BASE, baseName),
    };
    return prev;
  }, {});

export default withOverview(__dirname)({
  stories: ['../stories/**/*stories.mdx'],
  addons: ['@storybook/addon-essentials'],
  refs,
  core: {
    builder: '@storybook/builder-vite',
  }
} as any);
