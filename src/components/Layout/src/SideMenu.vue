<template>
  <XMenu key="sideMenu" :options="config">
    <template #header>
      <img class="logo" :src="Logo" />
    </template>
    <template #footer>
      <img class="logo" :src="Logo" />
    </template>
  </XMenu>
</template>

<script setup lang="ts">
import Logo from "/logo.svg";
import { XMenu } from "xw-ui/element-plus";
import { useMenu,menuStore } from "../hooks/useMenu.ts";
import { routesStoreWithOut } from "@/stores/modules/common/routes";
import { useRouter } from "vue-router";
import { ref, computed , type Ref } from 'vue'
const routeStore = routesStoreWithOut()
const router = useRouter();
const props = defineProps({
  layoutMode: String,
  defaultActive: String,
});

const { sideMenuOptions } = useMenu({
  type: 'side',
  routeInst: router,
  layoutMode: props.layoutMode,
  routes: routeStore.getRoutes,
  asyncRoutes: routeStore.getAddRoutes,
  asyncSideRoutes: routeStore.getAdminRoutes,
  defaultActive: props.defaultActive,
});
  console.log('====侧边栏组件配置 sideMenuOptions====',sideMenuOptions)
  console.log('====侧边栏组件配置 menuStore====',menuStore)

const config = computed(()=> sideMenuOptions.value)
</script>

<style scoped lang="less">
.logo {
  width: 120px;
}
</style>
