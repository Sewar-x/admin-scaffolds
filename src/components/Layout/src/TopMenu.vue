<template>
  <XMenu :options="options" >
    <template #header>
      <img class="logo" :src="Logo" />
    </template>
  </XMenu>
</template>

<script setup lang="ts">
import Logo from "/logo.svg";
import { XMenu } from "xw-ui/element-plus";
import { useSideMenu } from "../hooks/useMenu.ts";
import { routesStoreWithOut } from "@/stores/modules/common/routes";
import { useRouter } from "vue-router";
const router = useRouter()
const props = defineProps({
  layoutMode: String,
});

const userStore = routesStoreWithOut();
const options = useSideMenu({
  routeInst: router,
  layoutMode: props.layoutMode,
  routes: userStore.getRoutes,
  asyncRoutes: userStore.getAddRoutes,
  asyncSideRoutes: userStore.getAdminRoutes,
});
</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
