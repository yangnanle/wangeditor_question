import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/questionPage",
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '/normal',
        name: 'normal',
        component: () => import('@/views/normal.vue')
      },
      {
        path: '/questionPage',
        name: 'QuestionPage',
        component: () => import('@/views/questionPage.vue')
      },
    ]
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router
