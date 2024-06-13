<template>
  <div class="layout-container" v-if="layoutMode !== 'none'">
    <SideMenu
      v-if="layoutMode === 'aside' || layoutMode === 'topAside'"
      :layoutMode="layoutMode"
    />
    <div class="layout-content-container">
      <el-header class="header" v-if="layoutMode === 'top' || layoutMode === 'topAside'">
        <TopMenu :layoutMode="layoutMode" />
      </el-header>
      <el-main class="layout-content-main">
        <router-view />
      </el-main>
      <el-footer>
        <slot name="layout-content-footer" />
      </el-footer>
    </div>
  </div>
  <div v-else class="layout-container">
    <el-main class="layout-content-main">
      <router-view />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from "./TopMenu.vue";
import SideMenu from "./SideMenu.vue";
import ProjectConfig from "@/settings/projectSetting";
const layoutMode = ProjectConfig.layoutMode;
</script>

<style scoped lang="less">
.layout-container {
  height: 100%;
  :deep(.xw-ui-menus-header) {
    height: 60px;
  }
}
</style>
