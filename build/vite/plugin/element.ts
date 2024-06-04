import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export function configElementPlugin() {
  const elementPlugin = Components({
    dts: false,
    resolvers: [ElementPlusResolver()],
  });
  return elementPlugin;
}
