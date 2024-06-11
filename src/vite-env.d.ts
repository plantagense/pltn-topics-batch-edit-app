/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CRYSTALLIZE_TENANT_ID: string;
  readonly CRYSTALLIZE_TENANT_IDENTIFIER: string;
  readonly CRYSTALLIZE_ACCESS_TOKEN_ID: string;
  readonly CRYSTALLIZE_ACCESS_TOKEN_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
