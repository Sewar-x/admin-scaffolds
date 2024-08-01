import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import progress from 'vite-plugin-progress' // vite 打包进度插件
import UnoCSS from 'unocss/vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { configElementPlugin } from "./element";
import { configAutoImportPlugin } from "./autoImport";
import { configSvgIconsPlugin } from "./svgSprite";
import { configImageminPlugin } from "./imagemin";
import { configImagetoolsPlugin } from "./imagetools";
import { configCompressPlugin } from "./compress";
import { configMockPlugin } from "./mock";

/**
 * 创建插件数组
 * @param viteEnv 环境配置变量
 * @param isBuild 构建环境变量
 * @returns 
 */
export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_APP_TITLE,
    VITE_LEGACY,
    VITE_USE_MOCK,
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_ALL_ELEMENT_PLUS_STYLE,
    VITE_USE_MICRO_APP,
    VITE_USE_UNOCSS,
    VITE_USE_IMAGETOOLS
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue({
      script: {
        // 开启defineModel
        defineModel: true
      },
      template: {
        compilerOptions: VITE_USE_MICRO_APP ? {
          isCustomElement: tag => /^micro-app/.test(tag)
        } : {}
      }
    }),
    vueJsx(),
    progress(),
    ViteEjsPlugin({
      title: VITE_APP_TITLE
    }),
  ];

  // @vitejs/plugin-legacy 兼容旧浏览器
  VITE_LEGACY && vitePlugins.push(legacy());

  // unplugin-vue-components 按需自动引入element-plus
  !VITE_USE_ALL_ELEMENT_PLUS_STYLE && vitePlugins.push(configElementPlugin());
  !VITE_USE_ALL_ELEMENT_PLUS_STYLE && vitePlugins.push(configAutoImportPlugin());

  VITE_USE_UNOCSS && vitePlugins.push(UnoCSS());
  
  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  // vite-imagetools
  VITE_USE_IMAGETOOLS && vitePlugins.push(configImagetoolsPlugin());

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  

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
