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
import { useMenu } from "../hooks/useMenu.ts";
import { computed } from "vue";
import type { SideMenuType } from "../types.d";

const props = defineProps<{
  options: SideMenuType
}>()

const { sideMenuOptions } = useMenu({
  type: "side",
  routeInst: props.options.routeInst,
  layoutMode: props.options.layoutMode,
  routes: props.options.routes,
  asyncRoutes: props.options.asyncRoutes,
  asyncSideRoutes: props.options.asyncSideRoutes,
  defaultActive: props.options.defaultActive,
});

const config = computed(() => sideMenuOptions.value);
</script>

<style scoped lang="less">
.logo {
  width: 120px;
}
</style>
