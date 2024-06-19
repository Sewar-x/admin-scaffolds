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
  defaultActive: string;// 默认首页路由名称
  homePageName: string; // 首页路由名称
 }

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
  localeKey: string
}

