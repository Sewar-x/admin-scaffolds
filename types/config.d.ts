export type LocaleTypeArr = [string, string];
export type LocaleType = string

export interface ProjectConfig {
  // 项目名
  projectName: string;
  // Load Element-plus on demand
  loadOnDemandEl: boolean;
  // element ui size
  elementSize: string;
    // 布局模式
  layoutMode: 'top' | 'aside' | 'topAside' | 'none';
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];

}

