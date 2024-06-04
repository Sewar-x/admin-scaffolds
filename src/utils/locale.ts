const LocaleKey = "PMP_Locale";

export function getLocale() {
  return JSON.parse(sessionStorage.getItem(LocaleKey) as string);
}

export function setLocale(locale: object) {
  return sessionStorage.setItem(LocaleKey, JSON.stringify(locale));
}

export function removeLocale() {
  return sessionStorage.removeItem(LocaleKey);
}
