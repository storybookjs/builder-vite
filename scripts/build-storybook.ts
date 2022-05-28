import cp from 'child_process';
import path from 'path';
import { getBasePath, getModuleInfo, getOutDir, getPackagesInfo } from './build-utils';

const stories = getPackagesInfo()
  .map((info) => {
    const { packageJson } = info;
    if (packageJson?.pages) {
      return info;
    }
    return undefined;
  })
  .filter(Boolean) as ReturnType<typeof getPackagesInfo>;

stories.forEach((info) => {
  const { pkgDir, baseName } = getModuleInfo(info.path);
  const basePath = getBasePath(baseName);
  const { outDir } = getOutDir(info.path);
  const pkgStorybookConfig = path.join(pkgDir, '.storybook');
  // eslint-disable-next-line max-len
  const buildCommand = `npx cross-env NODE_OPTIONS=--enable-source-maps IS_PREVIEW=true build-storybook -c ${pkgStorybookConfig} -o ${outDir} --no-manager-cache --preview-url ${path.join(
    basePath,
    'iframe.html'
  )} --force-build-preview`;

  cp.execSync(buildCommand, { stdio: 'inherit', cwd: pkgDir });
});
