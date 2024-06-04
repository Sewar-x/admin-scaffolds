import type { ImportMetaEnv } from "#/env";

import { getConfigFileName } from "../../build/utils";

export function getMultipleLanguages() {
  const { VITE_MULTIPLE_LANGUAGES } = getAppEnvConfig();
  return VITE_MULTIPLE_LANGUAGES;
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
    (import.meta.env as unknown as ImportMetaEnv)
    : window[ENV_NAME as any]) as unknown as ImportMetaEnv;

  const {
    VITE_BASE_PATH,
    VITE_USE_ALL_ELEMENT_PLUS_STYLE,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_USE_MOCK,
    VITE_DROP_DEBUGGER,
    VITE_OUT_DIR,
    VITE_ASSETS_DIR,
    VITE_SOURCEMAP,
    VITE_USE_BUNDLE_ANALYZER,
    VITE_USE_CSS_SPLIT,
    VITE_DEV_PORT,
    VITE_USE_MICRO_APP,
    VITE_MULTIPLE_LANGUAGES
  } = ENV;

  return {
    VITE_BASE_PATH,
    VITE_USE_ALL_ELEMENT_PLUS_STYLE,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_USE_MOCK,
    VITE_DROP_DEBUGGER,
    VITE_OUT_DIR,
    VITE_ASSETS_DIR,
    VITE_SOURCEMAP,
    VITE_USE_BUNDLE_ANALYZER,
    VITE_USE_CSS_SPLIT,
    VITE_DEV_PORT,
    VITE_USE_MICRO_APP,
    VITE_MULTIPLE_LANGUAGES
  };
}
