<template>
  <XMenu :options="topMenuOptions">
    <template #header>
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
import { ref,reactive, watch, type Ref } from 'vue'
const router = useRouter()
const props = defineProps({
  layoutMode: String,
  defaultActive: String,
});

const userStore = routesStoreWithOut();
let topMenuOptions: Ref = ref({})
let sideMenuOptions: Object = reactive({})
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
 console.log('===顶部菜单变化====',topMenuOptions)

</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
