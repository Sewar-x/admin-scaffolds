<template>
  <div :class="[`${prefixCls}-container`]">
    <!-- name：应用名称, url：应用地址 -->
    <micro-app v-bind="options" :name="name"></micro-app>
  </div>
</template>
<script setup lang="ts">
import { useDesign } from "@/hooks/web/useDesign";
import microAppUtils from "@/plugins/micro-app/utils";
const props = defineProps<{
  options: {
    [key: string]: any;
  };
}>();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("micro-app");
const name = microAppUtils?.getMicroAppName(props.options?.name);
</script>
<style></style>
