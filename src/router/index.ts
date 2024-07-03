import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/python_mammoth",
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/mammoth',
        name: 'Mammoth',
        component: () => import('@/views/mammoth.vue')
      },
      {
        path: '/python_mammoth',
        name: 'PythonMammoth',
        component: () => import('@/views/python_mammoth.vue')
      },
    ]
  }

]
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
export default router
