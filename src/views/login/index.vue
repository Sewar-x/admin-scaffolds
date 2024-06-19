<template>
  <div :class="[`${prefixCls}-container`]">
    <el-card :class="[`${prefixCls}-panel`]">
      <template #header>
        <div :class="[`${prefixCls}-header`]">
          <span>登录</span>
        </div>
      </template>
      <XForm :options="options"></XForm>
      <template #footer>
        <div :class="[`${prefixCls}-footer`]">
          <el-button type="plain" link disabled> 其他登录方式 </el-button>
          <el-button type="danger" link disabled> 忘记密码 </el-button>
        </div>
      </template>
    </el-card>
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
import { useDesign } from "@/hooks/web/useDesign";
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("login");
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
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
});
// from 表单配置项
const options: object = {
  mode: data,
  attr: {
    "label-width": "50px",
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
        attr: {
          class: "login-button-container",
        },
        component: {
          comp: "el-button",
          content: {
            text: "提交",
          },
          attr: {
            class: "login-button",
            type: "primary",
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
    // 存储 token, 注意存储的 token key和存储方案需要在 createXhttp 参数相同！
    cookieUtils.setItem(requestSetting.tokenKey, token);
    //存储 token 过期时间，注意存储的 token 过期时间和存储方案需要在 createXhttp 参数相同！
    cookieUtils.setItem(requestSetting.refreshTokenConfig.tokenExpiresKey, expire);
    router.push({
      name: "authMenu1",
    });
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped lang="less">
@prefix-cls: ~"@{adminNamespace}-login";

.@{prefix-cls}-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .@{prefix-cls}-panel {
    width: 500px;
    height: 300px;
    :deep(.el-form-item__label) {
      padding: 0 15px !important;
    }

    :deep(.login-button) {
      width: 100%;
    }
    .@{prefix-cls}-footer {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
