<template>
  <XMenu :options="configs">
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
import { useMenu } from "../hooks/useMenu.ts";
import { routesStoreWithOut } from "@/stores/modules/common/routes";
import { useRouter } from "vue-router";
import { ref, watch, type Ref } from 'vue'
const router = useRouter();
const props = defineProps({
  layoutMode: String,
  defaultActive: String,
});

const userStore = routesStoreWithOut();
let topMenuOptions: Ref = ref({})
let sideMenuOptions: Ref = ref({})
let configs: Ref = ref({})
useMenu({
  routeInst: router,
  layoutMode: props.layoutMode,
  routes: userStore.getRoutes,
  asyncRoutes: userStore.getAddRoutes,
  asyncSideRoutes: userStore.getAdminRoutes,
  defaultActive: props.defaultActive,
  topMenuOptions,
  sideMenuOptions
});
    //监听顶部菜单栏变化
  watch(
    () => sideMenuOptions.value,
    (newValue) => {
      console.log('===侧边栏菜单变化====',newValue)
      configs.value = newValue
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped lang="less">
.logo {
  width: 120px;
}
</style>
