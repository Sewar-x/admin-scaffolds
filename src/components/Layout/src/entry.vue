<template>
  <div
    v-if="layoutMode !== 'none'"
    class="layout-container"
    :class="[`layout-${layoutMode}-container`]"
  >
    <SideMenu
      class="layout-side-menu"
      v-if="layoutMode === 'aside' || layoutMode === 'topAside'"
      :layoutMode="layoutMode"
      :default-active="ProjectConfig.defaultActive"
    />
    <div class="layout-content-container">
      <el-header class="header" v-if="layoutMode === 'top' || layoutMode === 'topAside'">
        <TopMenu :layoutMode="layoutMode" class="layout-top-menu" />
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
.layout-aside-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  .layout-content-container {
    width: 100%;
  }
}
.layout-top-container {
  .layout-content-container {
    display: flex;
    justify-content: start;
    flex-direction: column;
    height: 100%;
    .layout-content-main {
      height: 100%;
    }
  }
}
.layout-topAside-container {
  display: flex;
  .layout-content-container {
    width: 100%;
    .header {
      padding: 0;
      :deep(.el-header) {
        padding: 0;
      }
    }
  }
}
.layout-none-container {
}
</style>
