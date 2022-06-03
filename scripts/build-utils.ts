import type { PackageJson } from 'types-package-json';
import type { StorybookViteConfig } from '@storybook/builder-vite';
import type { InlineConfig } from 'vite';

import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { mergeConfig, defineConfig } from 'vite';

export const PREVIEW_BASE = '/';
// export const PREVIEW_BASE = '/builder-vite/';
export const OUTPUT_BASE = path.join(__dirname, `../public/`);
export const EXAMPLES_BASE = path.join(__dirname, `../examples/`);

export function getModuleInfo(packagePath: string) {
  const baseName = packagePath.split('/').pop();

  if (!baseName) {
    throw new Error('baseName is empty');
  }

  const pkgDir = path.join(EXAMPLES_BASE, baseName);

  return { baseName, pkgDir };
}

export function getOutDir(packagePath: string) {
  const { baseName } = getModuleInfo(packagePath);

  return { outDir: path.join(OUTPUT_BASE, baseName) };
}

export function getBasePath(baseName: string) {
  return path.join(PREVIEW_BASE, baseName, '/');
}

const definePreviewConfig = (packagePath: string, config: Record<string, any>): InlineConfig => {
  const { baseName } = getModuleInfo(packagePath);
  const { outDir } = getOutDir(packagePath);

  return mergeConfig(
    config,
    defineConfig({
      mode: 'production',
      base: getBasePath(baseName),
      build: { outDir, rollupOptions: { external: [] } },
    })
  );
};

const defineManagerConfig = (packagePath: string, config: Record<string, any>): Record<string, any> => {
  const { baseName } = getModuleInfo(packagePath);

  config.output.publicPath = getBasePath(baseName);

  return config;
};

export const getPackagesInfo = (): Array<{ path: string; packageJson: PackageJson }> => {
  const pkgs = readdirSync(EXAMPLES_BASE);

  return pkgs.map((pkgName) => {
    const packageJson = JSON.parse(
      readFileSync(path.join(EXAMPLES_BASE, pkgName, 'package.json'), { encoding: 'utf-8' })
    );

    return {
      packageJson,
      path: path.join(EXAMPLES_BASE, pkgName),
    };
  });
};

export const withOverview =
  (__dirname: string) =>
  (_config: StorybookViteConfig): StorybookViteConfig => {
    if (_config?.core?.builder !== '@storybook/builder-vite') {
      throw new Error('core.builder is not @storybook/builder-vite');
    }

    if (_config?.features?.buildStoriesJson === false) {
      throw new Error('features.buildStoriesJson is not enabled');
    }

    const isPreview = process.env.IS_PREVIEW === 'true';

    const managerWebpack = async (...args) => {
      const config = (await _config['managerWebpack']?.(...args)) || args?.[0];
      if (isPreview) {
        return defineManagerConfig(path.resolve(__dirname, '../'), config);
      }
      return config;
    };

    const viteFinal: typeof _config['viteFinal'] = async (...args) => {
      const config = (await _config['viteFinal']?.(...args)) || args?.[0];
      if (isPreview) {
        return definePreviewConfig(path.resolve(__dirname, '../'), config);
      }
      return config;
    };

    return {
      ..._config,
      features: { ...(_config.features || {}), buildStoriesJson: _config?.features?.buildStoriesJson ?? isPreview },
      // @ts-ignore
      managerWebpack,
      viteFinal,
    };
  };
