import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export function configAutoImportPlugin() {
  const autoImportPlugin = AutoImport({
    dts: false,
    resolvers: [ElementPlusResolver()],
  });
  return autoImportPlugin;
}
