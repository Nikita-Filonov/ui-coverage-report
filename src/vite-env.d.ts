/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AGENT_TYPE: string;
  readonly VITE_REPOSITORY_URL: string;
  readonly VITE_API_DATE_FORMAT: string;
  readonly VITE_API_TIME_FORMAT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
