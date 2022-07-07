import { defineStore } from 'pinia';
import { store } from '/@/store';

import { Nullable } from '/@/types/global';
import { UserInfo } from '/@/types/store';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    // userInfo: {
    //   userId: 0,
    //   userName: '张三',
    //   avatar: '',
    //   desc: '',
    //   roles: 'admin'
    // },
    // token
    userInfo: null,
    token: undefined
    // // Whether the login expired
    // sessionTimeout: false,
    // // Last fetch time
    // lastUpdateTime: 0
  }),
  getters: {
    userName: (state) => {
      return state?.userInfo?.userName || '';
    }
  },
  actions: {
    updateToken(token: string) {
      this.token = token;
    },
    updateUserName(name: string) {
      this!.userInfo!.userName = name;
    }
  },
  // 开启持久化
  persist: {
    enabled: true, // 启用
    strategies: [
      // storage 可选localStorage或sessionStorage
      // paths 给指定数据持久化
      { key: 'app-user', storage: localStorage }
    ]
  }
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
