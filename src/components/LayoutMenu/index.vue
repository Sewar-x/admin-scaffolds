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
    <template #viewer>
      <div :class="[`${prefixCls}-viewer`]" v-if="isMicroApp && isBaseApp">
        <div :class="[`${prefixCls}-viewer-microapp`]" v-if="isMicroAppView">
          <MicroAppContainer :options="microAppOptions" />
        </div>
        <div v-else>
          <router-view />
        </div>
      </div>
    </template>
  </LayoutMenu>
</template>

<script setup lang="ts">
import { watchEffect, ref, type Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LayoutMenu } from "sewen-ui/element-plus";
import Logo from "/logo.svg";
import ProjectConfig from "@/settings/projectSetting";
import { routesStoreWithOut } from "@/stores/modules/common/routes";
import LocalePicker from "@/components/LocalePicker/index.vue";
import { useDesign } from "@/hooks/web/useDesign";
import microAppUtils from "@/plugins/micro-app/utils";
import MicroAppContainer from "@/components/MicroAppContainer/index.vue";
import { isEmpty, isNullOrUnDef } from "@/utils/is"
const { isBaseApp, isMicroApp } = microAppUtils;
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("layout");
const { VITE_MULTIPLE_LANGUAGES } = import.meta.env;
const routeStore = routesStoreWithOut();
const router = useRouter();
const route = useRoute();

const options = {
  routeInst: router,
  layoutMode: ProjectConfig.layoutMode,
  routes: routeStore.getRoutes,
  asyncRoutes: routeStore.getAddRoutes,
  asyncSideRoutes: routeStore.getAdminRoutes,
  defaultActive: ProjectConfig.defaultActive,
};

let isMicroAppView: Ref =ref(false);
let microAppOptions: Ref = ref({});
watchEffect(async () => {
  microAppOptions.value = route.meta.microAppOptions
  isMicroAppView.value = !isNullOrUnDef(microAppOptions.value) && !isEmpty(microAppOptions.value)
});
</script>

<style scoped lang="less">
@prefix-cls: ~"@{adminNamespace}-layout";
.@{prefix-cls} {
  &-logo-container {
    height: 60px;
    width: 180px;
  }
  &-logo {
    height: 60px;
  }

  &-locales {
    position: fixed;
    right: 25px;
    top: 25px;
    height: 20px;
  }
  &-viewer,
  &-viewer-microapp {
    width: 100%;
    height: 100%;
  }

  :deep(.layout-content-main) {
    padding: 0;
  }
  :deep(.el-menu--vertical) {
    height:100%;
  }
}
</style>
