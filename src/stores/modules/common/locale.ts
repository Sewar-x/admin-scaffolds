import { defineStore } from "pinia";
import Storage from "@/utils/storage"
import type { LocaleSetting, LocaleType } from "#/config";
import { store } from "@/stores";
import { localeSetting } from "@/settings/localeSetting";

export function getLocale() {
  return Storage.getLocalStorage(localeSetting.localeKey) as string;
}

export function setLocale(locale: object) {
  return Storage.setLocalStorage(localeSetting.localeKey, locale);
}

const lsLocaleSetting = (getLocale() || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: "locale-store",
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? "zh_CN";
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      setLocale(this.localInfo);
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
