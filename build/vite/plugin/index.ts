import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import setting from "../../../src/settings/projectSetting";
import { configElementPlugin } from "./element";
import { configAutoImportPlugin } from "./autoImport";
import { configSvgIconsPlugin } from "./svgSprite";
import { configImageminPlugin } from "./imagemin";
import { configCompressPlugin } from "./compress";
import { configHtmlPlugin } from "./html";
import { configMockPlugin } from "./mock";

/**
 * 创建插件数组
 * @param viteEnv 环境配置变量
 * @param isBuild 构建环境变量
 * @returns 
 */
export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_USE_MOCK,
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
  ];

  // @vitejs/plugin-legacy 兼容旧浏览器
  VITE_LEGACY && vitePlugins.push(legacy());

  // unplugin-vue-components 按需自动引入element-plus
  setting.loadOnDemandEl && vitePlugins.push(configElementPlugin());
  setting.loadOnDemandEl && vitePlugins.push(configAutoImportPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  if (isBuild) {
    // vite-plugin-imagemin 图片压缩
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip 文件压缩
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );
  }

  return vitePlugins;
}
