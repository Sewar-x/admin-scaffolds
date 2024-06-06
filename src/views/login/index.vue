<template>
  <div class="login-panel">
    <XForm :options="options"></XForm>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from "element-plus";
import { XForm } from "xw-ui/element-plus";
import { reactive } from "vue";
import { cookieUtils } from "@/plugins/storage";
import { login } from "@/api/login";
import requestSetting from "@/settings/requestSetting";
import { useRouter } from "vue-router";
const router = useRouter();

interface RuleForm {
  username: string;
  password: string;
}

// 响应数据
let data = reactive<RuleForm>({
  username: "",
  password: "",
});

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "Please input  name", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "Please input description",
      trigger: "change",
    },
  ],
});
// from 表单配置项
const options: object = {
  mode: data,
  attr: {
    "label-width": "100px",
    rules: rules,
  },
  items: [
    [
      {
        attr: {
          prop: "username",
          label: "账号",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "password",
          label: "密码",
        },
        component: {
          comp: "el-input",
        },
      },
    ],

    [
      {
        component: {
          comp: "el-button",
          content: {
            text: "提交",
          },
          event: {
            submit: (val: any) => {
              // 表单提交事件
              submit(val);
            },
          },
        },
      },
    ],
  ],
};

const submit = async (params: any) => {
  try {
    const { expire, token } = await login(params);
    console.log("🚀 ~ submit ~  expire, token :", expire, token);
    // 存储 token, 注意存储的 token key和存储方案需要在 createXhttp 参数相同！
    cookieUtils.setItem(requestSetting.tokenKey, token);
    //存储 token 过期时间，注意存储的 token 过期时间和存储方案需要在 createXhttp 参数相同！
    cookieUtils.setItem(requestSetting.refreshTokenConfig.tokenExpiresKey, expire);
    router.push({
      name: "authMenu",
    });
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped lang="less"></style>
