import type { App } from "vue";

/**
 * 按需导入 element-plus 组件
 * @param app {App}
 */
import "element-plus/dist/index.css";
import { ElIcon, ElButton, ElInput, ElCheckbox } from "element-plus";
import "@/style/element-plus/index.less";
import Modal from "@/components/Dialog";

/**
 * 按需导入 element-plus 图标
 * @param app {App}
 */
import { Edit, Tools, Location, Setting } from "@element-plus/icons-vue";

export default function loadOnDemandEl(app: App) {
  [ElButton, ElIcon, ElInput, ElCheckbox].forEach((v) => {
    app.use(v);
  });
  [Edit, Tools, Location, Setting].forEach((v) => {
    app.component(v.name, v);
  });
  Modal._context = app._context;
  return app;
}
