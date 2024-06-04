import type { LocaleType } from "#/config";

import { set } from "lodash-es";

export const loadLocalePool: LocaleType[] = [];

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector("html")?.setAttribute("lang", locale);
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool);
}

export function genMessage(langs: Record<string, Record<string, any>>) {
  const langObject = {};

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;

    for (let object in langFileModule) {
      if (typeof langFileModule[object] === "string") {
        set(langObject, object, langFileModule[object]);
      } else {
        Object.assign(langObject, langFileModule[object]);
      }
    }
  });
  return langObject;
}
