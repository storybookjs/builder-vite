import * as path from 'path';
import { promise as glob } from 'glob-promise';

import type { Options, StoriesEntry } from '@storybook/core-common';

// TODO: Merge with https://github.com/storybookjs/builder-vite/pull/182
export async function listStories({ presets, configDir }: Options) {
  return (
    await Promise.all(
      (
        await presets.apply<Promise<StoriesEntry[]>>('stories')
      ).map((storiesEntry) => {
        const files = typeof storiesEntry === 'string' ? storiesEntry : storiesEntry.files;
        if (!files) {
          return [] as string[];
        }
        return glob(path.isAbsolute(files) ? files : path.join(configDir, files));
      })
    )
  ).reduce((carry, stories) => carry.concat(stories), []);
}
