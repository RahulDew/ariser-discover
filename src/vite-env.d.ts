/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERPER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
