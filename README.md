# admin-scaffolds
基于 vue3 + typescript + element-plus + xw-ui 的后台管理系统的脚手架

## 功能

| 功能     | 描述                                                  |
| -------- | ----------------------------------------------------- |
| 项目规范 | JS规范 、Git 提交规范 、样式规范 、代码格式 、Git检查 |
| 环境     | 开发、测试、正式、mock                                |
| 样式管理 | 全局样式、原子化 CSS、样式隔离                        |
| 路由管理 | 顶部菜单栏、侧边栏                                    |
| 登录     | 登录、单点登录、token 校验、token 刷新                |
| 权限管理 | 菜单权限、按钮/组件权限                               |
| 组件库   | JSON Scheme 公共组件库、业务组件                      |
| 插件管理 | 按需引入、自定义插件                                  |
| 国际化   | 本地语言数据、远程语言数据                            |
| 主题管理 |                                                       |
| 开发     | mock数据、页面模板生成                                |
| 测试     |                                                       |
| 构建     | 自定义构建                                            |
| 部署     | GitLab 流水线、自定义脚本                             |





## 技术栈

| 功能     | 描述                                  | 技术                                                         |
| -------- | ------------------------------------- | ------------------------------------------------------------ |
| 项目规范 | JS规范                                | Eslint                                                       |
|          | Git 提交规范                          | commitlint                                                   |
|          | 样式规范                              | stylelint                                                    |
|          | 代码格式                              | prettier                                                     |
|          | Git检查                               | husky                                                        |
| 环境     | 开发、测试、正式                      |                                                              |
|          | mock                                  | vite-plugin-mock                                             |
| 样式管理 | 全局样式                              | less、postcss                                                |
|          | 原子化 CSS                            | unocss                                                       |
|          | 样式隔离                              | 公共样式前缀                                                 |
| 路由管理 | 顶部菜单栏、侧边栏                    | Vue-Router                                                   |
| 权限管理 | 菜单权限、按钮/组件权限               |                                                              |
| 组件库   | JSON Scheme 公共组件库                | [xw-ui](https://sewar-x.github.io/X-UI/)                     |
|          | 组件库                                | element-plus                                                 |
| 插件管理 | 按需引入、自定义插件                  |                                                              |
| 国际化   | 本地语言数据、远程语言数据            | vue-i18n                                                     |
| 主题管理 |                                       |                                                              |
| http     | 集成全局 Token、Token刷新、校验、清除 | [xw-ui/xhttp](https://sewar-x.github.io/X-UI/zh-CN/components/library/xhttp/%E4%BD%BF%E7%94%A8.html#%E5%8A%9F%E8%83%BD) |
| 开发     | mock数据                              |                                                              |
|          | 页面模板生成                          | plop                                                         |
| 测试     |                                       |                                                              |
| 构建     | 自定义构建                            | Vite                                                         |
| 部署     | GitLab 流水线、自定义脚本             |                                                              |

## 项目配置

## 插件

插件为 Vue.js 应用程序提供了额外的功能或改进。

插件使用 vue 的插件机制添加到 Vue.js 中。

插件通过统一文件夹 `src/plugins/` 管理，管理规范：

* 所有插件放入文件夹 `src/plugins/`；
* 以文件夹名称命名插件；
* 插件使用 Vue.js 的插件机制添加到项目中；
* 在文件 `src/plugins/init` 提供插件的统一初始化方法，插件初始化方法在 `src/main.ts` 文件中使用。

### HTTP 插件

HTTP  插件是使用 [XHTTP | XW-UI ](https://sewar-x.github.io/X-UI/zh-CN/components/library/xhttp/使用.html) 插件，该插件是对 Axios 进行二次封装，增加了 登录 Token 管理相关逻辑。

### Permission 插件

权限控制插件是使用 [permission 插件 | XW-UI ](https://sewar-x.github.io/X-UI/zh-CN/components/library/vivien-permission/使用.html) 插件，[permission 插件 | XW-UI ](https://sewar-x.github.io/X-UI/zh-CN/components/library/vivien-permission/使用.html) 插件是一个基于后台管理系统中的路由菜单权限控制系统，通过 vue-router 全局控制后台管理系统的菜单权限。

**插件功能**：

| 功能             | 介绍                                                     |
| ---------------- | -------------------------------------------------------- |
| 菜单路由权限控制 | 通过接口返回权限路由名称，控制当前登录用户的路由权限     |
| 按钮级别权限控制 | 通过接口返回按钮权限列表名称，控制当前登录用户的按钮权限 |
| 单点登录         | 使用当前插件的系统和其他系统相互登录                     |

**插件配置**：

在目录 `src/plugins` 目录下新增 `/xw-permission` 目录，存在权限系统相关插件，创建插件初始化方法：

```javascript
import type { App } from "vue";
import initPermission from "xw-ui/permission"
import asyncRoutes from "@/router/asyncRoutes";
import basicRoutes from "@/router/basicRoutes";
import whiteList from "@/router/basicRoutes/whiteList";
import { checkSSOLogin, getAuthList } from "@/api/login"
import requestSetting from "@/settings/requestSetting"


const publicPath = import.meta.env.VITE_BASE_PATH // 系统 publicPath 目录
export async function setupXWPermission(app: App, router: any) {
    //定义一个符合 permissionOptions 接口的对象 
    const options = {
        router,
        publicPath, // 系统 publicPath 目录
        whiteList, // 路由白名单
        asyncRoutes, // 异步路由
        basicRoutes, // 基础路由
        getAuthList, // 获取用户权限列表
        checkSSOLogin, // 检查oa登录状态
        storageType: requestSetting.storageType,// 本地数据存储类型
        TOKEN_KEY: requestSetting.tokenKey, // token 存储 key 值
        SSO_TOKEN_KEYS: ['SIAMTGT', 'SIAMJWT'], //单点登录相关 token

    }
    await initPermission(app, options, (params: any) => {
        console.log('权限初始化完成===', params)
        getCallback(params)
    })
}

async function getCallback(params: any) {
    if (!params) return null
    console.log("🚀 ~permission getCallback:", params)
}

```

该方法提供插件相关初始化函数。

>  插件配置文档：[permission 插件 | XW-UI (sewar-x.github.io)](https://sewar-x.github.io/X-UI/zh-CN/components/library/vivien-permission/使用.html#配置)



**引入插件插件：**

在 `src/plugins/init.ts` 中动态引入插件：

```javascript
// 使用路由权限控制
export const initXWPermission = async (app: App) => {
    return await import("@/plugins/xw-permission/index").then(async (XWUI: any) => {
        XWUI.setupXWPermission(app);
        return XWUI
    });
}
```



在 `src/main.ts` 文件中添加插件初始化方法：

```javascript
    // 使用 路由权限控制
    if (VITE_USE_XW_UI_PERMISSION === 'true') {
        await initXWPermission(app);
    }
```



**使用插件**：

在 `src/.env` 文件中，添加配置 `VITE_USE_XW_UI_PERMISSION=true`： 

```shell
# 是否使用路由权限控制
VITE_USE_XW_UI_PERMISSION=true
```

如果你想关闭该插件使用，使 `VITE_USE_XW_UI_PERMISSION=false` 即可。 

### XElementPlus 组件

[XElementPlus 组件总览 | XW-UI ](https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-基础组件/Vue3-组件总览.html) 是基于 Element-Plus 二次封装，使用 JSON Scheme 配置化生成式组件库。

### Element-Plus 组件

### UnoCSS 插件

### Micro-App 插件

### 国际化

### 主题色

## mock 联调

## 页面

该模板包含基础页面：

* 登录
* 菜单和内容容器
* 404

### 登录

登录相关功能：

* 登录
* 单点登录
* token 校验
* token 刷新

### 菜单和容器

菜单与权限相关联，通过权限配置 map 动态生成菜单栏；

菜单栏分为左侧菜单栏和顶部菜单栏，通过配置菜单栏可以显示三种类型

* 仅左侧菜单栏
* 仅顶部菜单栏
* 顶部菜单和左侧菜单
  * 当同同时存在顶部菜单栏和左侧菜单时，将顶部菜单设置为一级菜单，左侧菜单设置为二级菜单



## 登录校验

HTTP 请求使用 [XHTTP | XW-UI ](https://sewar-x.github.io/X-UI/zh-CN/components/library/xhttp/使用.html) 插件，该插件是对 Axios 进行二次封装，加入了以下功能：

| 功能                           | 介绍                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| 消息提示                       | 成功/失败/错误等消息和模态弹窗提示 在浏览器端使用消息和模态弹窗提示 在node 端使用 console 打印 |
| 忽略重复请求                   |                                                              |
| 超时重试                       |                                                              |
| 加入请求时间戳                 | 请求时间戳可以用于调试接口                                   |
| 上传文件默认采用 formdata 格式 | 上传文件默认配置： `header:{Content-type: FORM_DATA = 'multipart/form-data;charset=UTF-8',}` |
| 固定状态码提示和处理           |                                                              |
| ajax 错误日志收集钩子          | `addAjaxErrorInfo`                                           |
| 全局请求 token                 |                                                              |
| **token 校验**                 |                                                              |
| **token 刷新**                 | 传入 token 过期时间和时间间隔，在每次请求之前自动判断当前时间与 token 过期时间差小于指定刷新间隔时间，如果是，自动请求刷新 Token 接口刷新 Token，并将后续请求缓存；待刷新 Token 接口返回后，使用新的 token 请求缓存的请求。 |
| 错误清除 token                 |                                                              |
| 错误退出登录                   |                                                              |
| 格式化返回格式                 | 格式化返回格式                                               |
| 提供请求处理钩子               |                                                              |
|                                | 请求之前处理配置: `beforeRequestHook`                        |
|                                | 请求成功处理: `transformRequestData`                         |
|                                | 请求失败处理: `requestCatch`                                 |
|                                | 请求之前的拦截器: `requestInterceptors`                      |
|                                | 请求之后的拦截器: `responseInterceptors`                     |
|                                | 请求之前的拦截器错误处理: `requestInterceptorsCatch`         |
|                                | 请求之后的拦截器错误处理: `responseInterceptorsCatch`        |



## 权限和路由

权限模块使用 [permission 插件 | XW-UI ](https://sewar-x.github.io/X-UI/zh-CN/components/library/vivien-permission/使用.html)  ，该插件提供以下功能：

| 功能             | 介绍                                                     |
| ---------------- | -------------------------------------------------------- |
| 菜单路由权限控制 | 通过接口返回权限路由名称，控制当前登录用户的路由权限     |
| 按钮级别权限控制 | 通过接口返回按钮权限列表名称，控制当前登录用户的按钮权限 |
| 单点登录         | 使用当前插件的系统和其他系统相互登录                     |

路由划分为异步路由和常规路由：

* 异步路由：动态加载的路由，根据后端返回权限动态加载；
* 常规路由：项目加载时直接加载的路由，不根据权限动态加载，与权限无关，所有用户可见；如：根页面、登录页面、404页面。
* 路由白名单：不需要权限的路由。
  * 一般情况将所有常规路由都会添加到路由白名单中，如果你想将异步路由添加到白名单，直接在  `src/router/basicRoutes/whiteList.ts` 中添加路由名称

**添加异步路由**：

异步路由位于 `src/router/asyncRoutes/module` 中，在该文件夹中，以模块名称作为文件夹名称新增文件夹。

**添加常规路由**：

常规路由位于 `src/router/basicRoutes/basicRoutes.ts` 中，在该文件中直接添加路由。



## 样式隔离方案

应用框架使用 样式前缀方式进行样式隔离。

### 定义样式前缀

样式前缀定义在 `src/styles/variables.module` 文件中：

```less
// 命名空间
@adminNamespace: mainapp;
// el命名空间
@elNamespace: el;

// 导出变量
:export {
  namespace: @adminNamespace;
  elNamespace: @elNamespace;
}

```

`@adminNamespace` 为应用样式前缀定义。

### 使用样式前缀

使用样式前缀需要修改两个地方：

* html 标签类名中 使用样式前缀
* css 类名 中使用样式前缀

1. **html 标签类名**中使用样式前缀：

在你的组件/页面中，引入 `useDesign` hooks：

```js
import { useDesign } from "@/hooks/web/useDesign";
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("你的组件名称");
```

在 html 标签中定义类名：

```html
 <div :class="[`${prefixCls}-container`]"></div>
```

2. **css 类名中使用样式前缀**

```less
<style scoped lang="less">
@prefix-cls: ~"@{adminNamespace}-你的组件名称";
.@{prefix-cls}-container {
  width: 100%;
  height: 100%;
}
</style>
```

最终形成效果如下：

![](./docs/assets/images/样式隔离方案.png)









## 构建

## 部署

