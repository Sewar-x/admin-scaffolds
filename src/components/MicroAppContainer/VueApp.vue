<template>
  <div :class="[`${prefixCls}-container`]">
    <!-- name：应用名称, url：应用地址 -->
    <micro-app v-bind="options" :name="name"></micro-app>
  </div>
</template>
<script setup lang="ts">
import { useDesign } from "@/hooks/web/useDesign";
import ProjectSetting from "@/settings/projectSetting";
const props = defineProps<{
  options: {
    [key: string]: any;
  };
}>();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("micro-app");
const name = `${ProjectSetting.projectName}-vue-${props.options?.name}`;
</script>
<style></style>
