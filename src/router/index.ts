import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/pageEditor",
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
      {
        path: '/pageEditor',
        name: 'PageEditor',
        component: () => import('@/views/pageEditor.vue')
      },
    ]
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router
