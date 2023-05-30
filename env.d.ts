/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_Diy: string
  readonly VITE_ENV: string
  readonly VITE_Mock: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
