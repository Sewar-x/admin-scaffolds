<template>
  <LayoutMenu :options="options" :class="[`${prefixCls}`]">
    <template #sideHeader>
      <img :class="[`${prefixCls}-logo`]" :src="Logo" />
    </template>
    <template #topFooter>
      <div :class="[`${prefixCls}-locales`]" v-if="VITE_MULTIPLE_LANGUAGES === 'true'">
        <LocalePicker :showText="true" />
      </div>
    </template>
  </LayoutMenu>
</template>

<script setup lang="ts">
import { LayoutMenu } from "xw-ui/element-plus";
import Logo from "/logo.svg";
import ProjectConfig from "@/settings/projectSetting";
import { routesStoreWithOut } from "@/stores/modules/common/routes";
import { useRouter } from "vue-router";
import LocalePicker from "@/components/LocalePicker/index.vue";
import { useDesign } from "@/hooks/web/useDesign";
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("layout");
const { VITE_MULTIPLE_LANGUAGES } = import.meta.env;
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
@prefix-cls: ~"@{adminNamespace}-layout";
.@{prefix-cls} {
  &-logo {
    height: 60px;
  }

  &-locales {
    position: fixed;
    right: 25px;
    top: 25px;
    height: 20px;
  }
}
</style>
