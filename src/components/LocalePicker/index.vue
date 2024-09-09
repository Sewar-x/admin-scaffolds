<template>
  <XDropdown :options="options">
    <span v-if="showText">{{ language }}</span>
  </XDropdown>
</template>

<script setup lang="ts">
import { XDropdown } from "sewen-ui/element-plus";
import { unref, computed } from "vue";
import type { LocaleType } from "#/config";
import { useLocale } from "@/plugins/locales/useLocale";
import { LOCALE } from "@/settings/localeSetting";

defineProps<{
  showText: boolean;
}>();

const { changeLocale, getLocale } = useLocale();

/**
 * 依据本地语言 lang 切换语言配置
 * @param lang
 */
async function toggleLocale(lang: LocaleType) {
  await changeLocale(lang as LocaleType);
  location.reload();
}

/**
 * 依据项目语言配置+项目运行语言配置 locale，返回下拉菜单文本显示内容
 */
const language = computed(() => {
  const locale = unref(getLocale);
  for (let i = 0; i < Object.values(LOCALE).length; i++) {
    if (Object.values(LOCALE)[i][0] === locale) {
      return Object.values(LOCALE)[i][1];
    }
  }
});


/**
 * 多语言下拉菜单的渲染配置对象
 */
const options = {
  icon: {
    prefixIcon: "IonLanguage",
    isSvgIcon: true,
    size: 16,
  },
  attr: {
    placement: "bottom",
    trigger: "click",
  },
  event: {
    command: toggleLocale,
  },
  items: Object.values(LOCALE).map((localeItem) => {
    return {
      attr: {
        command: localeItem[0],
      },
      content: localeItem[1],
    };
  })
};
</script>

<style scoped lang="less">
span {
  margin-left: 5px;
}

.loading {
  background: "rgba(0, 0, 0, 1)";
}
</style>
