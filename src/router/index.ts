import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import nprogress from 'nprogress'; // @types/nprogress
import 'nprogress/nprogress.css';
import Test from '/@/layout/test.vue';

// 开发模式使用路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: Test,
    meta: {
      requiresAuth: true
    }
    // children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes // 路由规则
});

// router.beforeEach((to, _from) => {
//   nprogress.start(); // 开始加载进度条 页面加载进度条效果
//   if (to.meta.requiresAuth && !store.state.user) {
//     // 此路由需要授权，请检查是否已登录
//     // 如果没有，则重定向到登录页面
//     return {
//       path: '/login',
//       // 保存我们所在的位置，以便以后再来
//       query: { redirect: to.fullPath }
//     };
//   }
// });

router.afterEach(() => {
  nprogress.done(); // 加载进度条
});

export default router;
