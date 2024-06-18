<template>
  <LayoutMenu :options="options">
    <template #sideHeader>
      <img class="logo" :src="Logo" />
    </template>
    <template #sideFooter>
      <img class="logo" :src="Logo" />
    </template>
  </LayoutMenu>
</template>

<script setup lang="ts">
import { LayoutMenu } from "xw-ui/element-plus";
import Logo from "/logo.svg";
import ProjectConfig from "@/settings/projectSetting";
import { routesStoreWithOut } from "@/stores/modules/common/routes";
import { useRouter } from "vue-router";
const routeStore = routesStoreWithOut();
const router = useRouter();
const options = {
  routeInst: router,
  layoutMode: ProjectConfig.layoutMode,
  routes: routeStore.getRoutes,
  asyncRoutes: routeStore.getAddRoutes,
  asyncSideRoutes: routeStore.getAdminRoutes,
  defaultActive: ProjectConfig.defaultActive,
};
</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
