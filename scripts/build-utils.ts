import type { PackageJson } from 'types-package-json';
import type { InlineConfig } from 'vite';

import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { mergeConfig, defineConfig } from 'vite';

export const PREVIEW_BASE = '/builder-vite/';
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

export const definePreviewConfig = (packagePath: string, config: Record<string, any>): InlineConfig => {
  const { baseName } = getModuleInfo(packagePath);
  const { outDir } = getOutDir(packagePath);

  return mergeConfig(
    config,
    defineConfig({
      mode: 'development',
      base: getBasePath(baseName),
      build: { outDir, rollupOptions: { external: [] } },
    })
  );
};

export const defineManagerConfig = (packagePath: string, config: Record<string, any>): Record<string, any> => {
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
