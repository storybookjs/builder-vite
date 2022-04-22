import type { Options } from '@storybook/core-common';

// Using instead of `Record<string, string>` to provide better aware of used options
type IframeOptions = {
  frameworkPath: string;
  title: string;
};

type ViteBuilderFeatures = Options['features'] & {
  eagerImportStories?: boolean;
};

export type ExtendedOptions = Options & IframeOptions & { features: ViteBuilderFeatures };
