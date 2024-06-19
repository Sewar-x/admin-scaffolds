
import { getConfigFileName } from "../../build/utils";

export function getMultipleLanguages() {
  const { VITE_MULTIPLE_LANGUAGES } = getAppEnvConfig();
  return VITE_MULTIPLE_LANGUAGES;
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
    (import.meta.env as unknown as ViteEnv)
    : window[ENV_NAME as any]) as unknown as ViteEnv;
  return ENV;
}
