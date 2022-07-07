import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import nprogress from 'nprogress'; // @types/nprogress
import 'nprogress/nprogress.css';
import AppLayout from '/@/layout/AppLayout.vue';
import { routerPath } from '/@/router/constant';

// 开发模式使用路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: routerPath.home, // 默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: routerPath.api,
        name: 'api_management',
        component: () => import('../views/api-management/index.vue'),
        meta: { title: '接口管理' }
      },
      {
        path: routerPath.users,
        name: 'user_management',
        component: () => import('../views/user-management/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: routerPath.logs,
        name: 'logs',
        component: () => import('../views/event-logs/index.vue'),
        meta: { title: '查看日志' }
      }
    ]
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
