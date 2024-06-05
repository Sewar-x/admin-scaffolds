import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { wrapperEnv, buildAssetsFile, buildChunkFile } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import progress from 'vite-plugin-progress' // vite 打包进度插件
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import' // element plus 按需引入
import EslintPlugin from 'vite-plugin-eslint' // vite eslint 格式化插件
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite' // i18n 预编译
import { viteMockServe } from 'vite-plugin-mock' // mock 服务
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer' // vite打包视图分析


// https://vitejs.dev/config/
const url = import.meta.url;
// process.cwd()方法返回Node.js进程的当前工作目录。
const root = process.cwd()


// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {

  const isBuild = command === 'build'
  // 加载 root 中的 .env 文件。根据执行命令的环境类型获取变量
  const env = loadEnv(mode, root);

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);
  const {
    VITE_BASE_PATH,
    VITE_USE_ALL_ELEMENT_PLUS_STYLE,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_USE_MOCK,
    VITE_DROP_DEBUGGER,
    VITE_OUT_DIR,
    VITE_ASSETS_DIR,
    VITE_SOURCEMAP,
    VITE_USE_BUNDLE_ANALYZER,
    VITE_USE_CSS_SPLIT,
    VITE_DEV_PORT,
    VITE_USE_MICRO_APP
  } = viteEnv;

  return {
    base: VITE_BASE_PATH,
    plugins: [
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
      // 是否全量引入 element plus
      VITE_USE_ALL_ELEMENT_PLUS_STYLE === false
        ? createStyleImportPlugin({
          resolves: [ElementPlusResolve()],
          libs: [
            {
              libraryName: 'element-plus',
              esModule: true,
              resolveStyle: (name) => {
                if (name === 'click-outside') {
                  return ''
                }
                return `element-plus/es/components/${name.replace(/^el-/, '')}/style/css`
              }
            }
          ]
        })
        : undefined,
      // eslint 格式化
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      // i18n 预编译
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      // 是否开启 Mock 服务
      VITE_USE_MOCK === 'true'
        ? viteMockServe({
          ignore: /^\_/,
          mockPath: 'mock',
          localEnabled: !isBuild,
          prodEnabled: isBuild,
          injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'

          setupProdMockServer()
          `
        })
        : undefined,
      UnoCSS()
    ],
    // css 配置
    css: {
      preprocessorOptions: {
        // 引入 less 全局变量
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    // 构建选项
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log'] : undefined,
      drop: VITE_DROP_DEBUGGER? ['debugger'] : undefined
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", url)), // 源文件目录别名
        "#": fileURLToPath(new URL("./types", url)), // 类型定义文件目录别名
        $locale: fileURLToPath(new URL("./src/locales/setupLocale.ts", url)), // 多语言翻译函数别名
        $store: fileURLToPath(new URL("./src/stores/modules", url)), // Store 文件别名
        $styleVariable: fileURLToPath(new URL("./src/style/variable.module.less", url)), // 全局样式文件别名
      },
    },
    build: {
      target: "esnext",
      outDir: VITE_OUT_DIR || 'dist',
      sourcemap: VITE_SOURCEMAP === 'true',
      // brotliSize: false,
      rollupOptions: {
        plugins: VITE_USE_BUNDLE_ANALYZER === 'true' ? [visualizer()] : undefined,
        // 拆包
        output: {
          chunkFileNames: (chunkInfo: any) => buildChunkFile(chunkInfo, VITE_ASSETS_DIR),
          entryFileNames: "[name]-[hash].js",
          assetFileNames: (chunkInfo: any) => buildAssetsFile(chunkInfo, VITE_ASSETS_DIR),
          manualChunks: {
            'vue-chunks': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
            'element-plus': ['element-plus'],
          }
        }
      },
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      cssCodeSplit:VITE_USE_CSS_SPLIT
    },
    server: {
      port: VITE_DEV_PORT, // 自定义端口号  
      fs: {
        strict: false
      },
      open: true,
      cors: true,
      hmr: true, // 开启热更新
      proxy: createProxy(VITE_PROXY),
    },

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        'axios'
      ]
    }
  }
}
