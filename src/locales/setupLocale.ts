import { useLocaleStoreWithOut } from "$store/common/locale";
import { i18n } from "@/locales/setupI18n";
const locale = useLocaleStoreWithOut().getLocale;

export function $t(word: string) {
  if (locale === "zh_CN") return word;
  if (!i18n) return word;
  const { t } = i18n.global;
  return t(word);
}
