import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { wrapperEnv, buildAssetsFile, buildChunkFile } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import { visualizer } from 'rollup-plugin-visualizer' // vite打包视图分析
import { createVitePlugin } from "./build/vite/plugin";

// https://vitejs.dev/config/
const url = import.meta.url;
// process.cwd()方法返回Node.js进程的当前工作目录。
const root = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfig => {

  // 加载 root 中的 .env 文件。根据执行命令的环境类型获取变量
  const env = loadEnv(mode, root);
  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);
  const isBuild = command === "build";
  const {
    VITE_BASE_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_DROP_DEBUGGER,
    VITE_OUT_DIR,
    VITE_ASSETS_DIR,
    VITE_SOURCEMAP,
    VITE_USE_BUNDLE_ANALYZER,
    VITE_USE_CSS_SPLIT,
    VITE_DEV_PORT,
  } = viteEnv;
  return {
    base: VITE_BASE_PATH,
    plugins: createVitePlugin(viteEnv, isBuild),
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
      drop: VITE_DROP_DEBUGGER ? ['debugger'] : undefined
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", url)), // 源文件目录别名
        "#": fileURLToPath(new URL("./types", url)), // 类型定义文件目录别名
        $locale: fileURLToPath(new URL("./src/plugins/locales/setupLocale.ts", url)), // 多语言翻译函数别名
        $store: fileURLToPath(new URL("./src/stores/modules", url)), // Store 文件别名
        $styleVariable: fileURLToPath(new URL("./src/style/variable.module.less", url)), // 全局样式文件别名
      },
    },
    build: {
      target: "esnext",
      outDir: VITE_OUT_DIR || 'dist',
      sourcemap: VITE_SOURCEMAP,
      // brotliSize: false,
      rollupOptions: {
        plugins: VITE_USE_BUNDLE_ANALYZER? [visualizer()] : undefined,
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
      cssCodeSplit: VITE_USE_CSS_SPLIT
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
