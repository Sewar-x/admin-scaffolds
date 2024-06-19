import type { App } from "vue";
// Register icon sprite
import "virtual:svg-icons-register";

export function setupDefineComponent(app: App) {
  [].forEach((v) => {
    app.component(v.__name as string, v);
  });
  return app;
}
