
declare global {
  type T = any;
  type Recordable<T = any> = Record<string, T>;

   interface IconType {
    isSvgIcon: boolean;
    name: string;
    size?: number | string;
    color?: string;
    style?: object;
  }


  interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
    VITE_NODE_ENV: string
    VITE_APP_TITLE: string
    VITE_API_BASE_PATH: string
    VITE_BASE_PATH: string
    VITE_DROP_DEBUGGER: string
    VITE_SOURCEMAP: string
    VITE_OUT_DIR: string
    VITE_USE_BUNDLE_ANALYZER: boolean
    VITE_USE_ALL_ELEMENT_PLUS_STYLE: boolean
    VITE_USE_CSS_SPLIT: boolean
    VITE_USE_ONLINE_ICON: boolean,
    VITE_USE_MICRO_APP: boolean,
    VITE_MICRO_IS_BASE_APP: boolean,
    VITE_MULTIPLE_LANGUAGES: boolean,
    VITE_ASSETS_DIR: string,
    VITE_DEV_PORT: string,
    VITE_USE_XW_UI_ELEMENT_PLUS: boolean,
    VITE_USE_XW_UI_PERMISSION: boolean,
    VITE_USE_UNOCSS: boolean
  }
}
