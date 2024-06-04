import Storage from "@/utils/storage";
import { defineStore } from "pinia";
import { login, logout, getInfo, checkOaLogin, getAuthList } from "@/api/common/user";
import { router } from "@/router";
import { store } from "@/stores";
import { USER_INFO_KEY } from "@/enums/cacheEnum"
import { getToken, setToken, removeToken, getOAToken } from "@/utils/token";
import { getChildValue } from "@/utils/index"
import { adminHomeStoreWithOut } from "@/stores/modules/admin/home";
const adminHomeStore = adminHomeStoreWithOut();
interface LoginParams {
  username: string | undefined;
  password: string | undefined;
}

export interface UserInfo {
  cn_name: string | number | undefined | null,
  name?: string | number | undefined | null,
  en_name?: string | number | undefined | null,
  uid?: string | number | undefined | null,
  work_number?: string | number | undefined | null, // 工号
  department_id?: string | number | undefined | null, // 用户部门id
  email?: string | number | undefined | null,
  mobile?: string | number | undefined | null,
  avatar?: string | undefined | null,
  roles?: Object | undefined | null,
}

export interface authorityType {
  menu: Array<T>, // 菜单权限
  menuNames: Array<T>, // 菜单权限名称列表
  rule: Array<T>,// 按钮级别权限
}

export interface TokenType {
  token?: string | undefined | null,
  expire?: string | undefined | null,
  oa?: {
    ticketName?: string | undefined | null,
    ticketValue?: string | undefined | null,
  }
}

interface UserState {
  userInfo: UserInfo;
  authority: authorityType,
  token?: string | undefined | null,
  expire?: string | undefined | null,
  oa?: {
    ticketName?: string | undefined | null,
    ticketValue?: string | undefined | null,
  }
}

export const useUserStore = defineStore({
  id: "user-store",

  state: (): UserState => ({
    // user info
    userInfo: {
      cn_name: null,//中文名称
      name: null,//中文名称
      en_name: null,//英文名称
      uid: null,//用户id
      work_number: null, // 工号
      department_id: null, // 用户部门id
      email: null,
      mobile: null,//手机号
      avatar: null,//头像
      roles: []
    },
    authority: {
      menu: [], // 菜单权限
      menuNames: [],  // 菜单权限名称列表
      rule: [], // 按钮级别权限
    },
    // token
    token: undefined,
    expire: undefined,
    oa: {
      ticketName: null,
      ticketValue: null
    }
  }),

  getters: {
    getUserInfo(): UserInfo | null | undefined {
      return Storage.getLocalStorage(USER_INFO_KEY) || {} as UserInfo;
    },
    getToken(): string {
      return getToken();
    },
    getAuthority(): authorityType {
      return this.authority || {};
    }
  },

  actions: {

    SetToken(data: TokenType) {
      const {
        oa = { ticketName: null, ticketValue: null },
        token = null
      } = data;
      this.token = token || ''; // for null or undefined value
      this.oa = oa;
      setToken(token);
      if (oa.ticketName) {
        Storage.setCookies(oa.ticketName, oa.ticketValue);
      }
    },

    SetUserInfo(info: UserInfo) {
      if (info?.roles) {
        info.roles = null;
      }
      this.userInfo = info;
      Storage.setLocalStorage(USER_INFO_KEY, this.userInfo);
    },

    SetAuthority(authority: authorityType) {
      this.authority = authority
    },

    // 登录
    async Login(params: LoginParams): Promise<null> {

      try {
        const data = await login(params);
        this.SetToken(data);
        return data;
      } catch (error) {
        return null;
      }
    },

    // 获取用户信息
    async GetUserInfo(): Promise<T> {
      try {
        const data = await getInfo()

        this.SetUserInfo(data);
        return data
      } catch (error) {
        this.ClearLocal();
        return null;
      }
    },

    // 获取用户权限列表
    async GetAuthority(): Promise<T> {
      try {
        const data = await getAuthList({
          type: 3
        })
        const leftMenuNames: Array<T> = []
        // 递归获取后端路由 name 的数组存入 leftMenuNames
        getChildValue(data?.menu || [], leftMenuNames, 'name', 'children')
        data.menuNames = leftMenuNames
        this.SetAuthority(data);
        return data
      } catch (error) {
        this.ClearLocal();
        return null;
      }
    },






    // 使用 oa token 登录系统
    async CheckOaLogin() {
      const { key, oaToken } = getOAToken();
      if (!oaToken) return false;
      try {
        const data = await checkOaLogin({
          ticketName: key,
          ticketValue: oaToken
        })
        return data;
      } catch (error) {
        this.Logout();
      }
    },


    // 退出
    async Logout() {
      try {

      } catch (error) {
        console.error(error);
      } finally {
        this.ClearLocal();
        location.hash = '/login'
        await adminHomeStore.resetMenuDefault()
      }
    },

    //清空存储数据
    ClearLocal() {
      removeToken();
      Storage.clearLocalStorage();
      Storage.clearSessioStorage();
      Storage.clearCookies();
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store)
}