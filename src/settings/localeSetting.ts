import type { LocaleSetting, LocaleTypeArr } from "#/config";

export const LOCALE: { [key: string]: LocaleTypeArr } = {
  ZH_CN: ["zh_CN", "简体中文"],
  EN_US: ["en", "English"],
};

export const localeSetting: LocaleSetting = {
  // Whether to display the selected language name
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN[0],
  // Default locale
  fallback: LOCALE.ZH_CN[0],
  // available Locales
  availableLocales: [LOCALE.ZH_CN[0], LOCALE.EN_US[0]],
};
