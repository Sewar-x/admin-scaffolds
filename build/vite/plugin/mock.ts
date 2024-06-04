/**
 * vite-plugin-mock:
 * Provide local and prod mocks for vite.
 * url: https://www.npmjs.com/package/vite-plugin-mock
 */

import { viteMockServe } from "vite-plugin-mock";

export function configMockPlugin(isBuild: boolean) {
  const viteMockPlugin = viteMockServe({
    // Set the folder where the mock .ts file is stored
    mockPath: "src/mock",
    // After opening, the ts file module can be read. Note that you will not be able to monitor .js files after opening.
    supportTs: true,
    // If watchFiles:true, the file changes in the folder will be monitored. And synchronize to the request result in real time
    watchFiles: true,
    // Set whether to enable the local mock .ts file, do not open it in the production environment
    localEnabled: !isBuild,
    // Set whether to enable mock function for packaging
    prodEnabled: !isBuild,
  });
  return viteMockPlugin;
}
