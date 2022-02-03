/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly STORYBOOK: string;
  readonly STORYBOOK_ENV_VAR: string;
  readonly VITE_ENV_VAR: string;
  readonly ENV_VAR: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.mdx';
