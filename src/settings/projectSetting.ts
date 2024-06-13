import type { ProjectConfig } from "#/config";
import { getAppEnvConfig } from "@/utils/env"


const { VITE_USE_ALL_ELEMENT_PLUS_STYLE, VITE_APP_TITLE } = getAppEnvConfig()
const setting: ProjectConfig = {
  // 项目名
  projectName: VITE_APP_TITLE,
  loadOnDemandEl: VITE_USE_ALL_ELEMENT_PLUS_STYLE != 'true',
  // element ui size
  elementSize: "mini",
  layoutMode: "top", //'top' | 'aside' | 'topAside' | 'none'
};

export default setting;
