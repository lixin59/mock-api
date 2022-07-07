import axios, { AxiosRequestConfig } from 'axios';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { HTTPStatusCodeEnum } from '/@/types/http';
// import router from '/@/router/';

let testHost = '';
if (import.meta.env.DEV) {
  // 开发环境使用配置的host
  testHost = import.meta.env.VITE_TEST_HOST;
}

const localhost = testHost || window.location.host;

export const baseUrl = `http://${localhost}/`;

const userStore = useUserStoreWithOut();
const request = axios.create({
  baseURL: baseUrl
});

console.log(userStore);
console.log('baseurl', baseUrl);

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 统一设置用户身份 token
    // const user = store.state.user;
    // if (user && user.token) {
    //   config!.headers!.Authorization = user.token;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 控制登录过期的锁 类似防抖函数的效果,防止短时间内多次调用同一个请求
let isRefreshing = false;

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    const status = response.data.status;

    // 正确的情况
    if (!status || status === HTTPStatusCodeEnum.OK) {
      return response;
    }

    console.log('res', response);

    // 错误情况：比如 token 无效...

    // 统一处理登录过期
    if (status === 410000) {
      if (isRefreshing) return Promise.reject(response);
      isRefreshing = true;
      console.error('您的登录已过期，您可以取消停留在此页面，或确认重新登录');
      // ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      //   confirmButtonText: '确认',
      //   cancelButtonText: '取消'
      // })
      //   .then(() => {
      //     // 清除本地过期的登录状态
      //     store.commit('setUser', null);
      //     // 跳转到登录页面
      //     router.push({
      //       name: 'login',
      //       query: {
      //         redirect: router.currentRoute.value.fullPath
      //       }
      //     });
      //     // 抛出异常
      //   })
      //   .finally(() => {
      //     isRefreshing = false;
      //   });

      // 在内部消化掉这个业务异常
      return Promise.reject(response);
    }

    // 其它错误情况
    console.warn('请求失败，请稍后重试');
    // 手动返回一个 Promise 异常
    return Promise.reject(response);
  },
  function (error) {
    // console.error('请求失败，请稍后重试', error);
    return Promise.reject(error);
  }
);

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then((res) => {
    return (res.data.data || res.data) as T;
  });
};
