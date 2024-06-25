import { genMessage } from "../helper";
import elLocale from "element-plus/dist/locale/en.mjs";

const modules = import.meta.glob("./en/**/*.ts", { eager: true }) as Record<
  string,
  Record<string, any>
>;
export default {
  message: {
    ...genMessage(modules),
    elLocale,
  },
  dateLocale: null,
  dateLocaleName: "en",
};
