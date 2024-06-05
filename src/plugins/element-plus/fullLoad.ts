import type { App } from "vue";

/**
 * 完整导入 element-plus 组件
 * @param app {App}
 */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/element-plus/index.less";
// import Modal from "@/components/Dialog";

/**
 * 完整导入 element-plus 图标
 * @param app {App}
 */
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default function fullLoadEl(app: App, params: Object) {
  app.use(ElementPlus, params);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // Modal._context = app._context;
  return app;
}
