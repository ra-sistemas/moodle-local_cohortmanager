import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import App from '@/App.vue';
import CohortDetail from '@/CohortDetail.vue';
import CohortEdit from '@/CohortEdit.vue';
import CohortCreate from '@/CohortCreate.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CohortList',
    component: App,
    meta: {
      title: 'Cohort Manager'
    }
  },
  {
    path: '/cohort/:id',
    name: 'CohortDetail',
    component: CohortDetail,
    meta: {
      title: 'Cohort Details'
    },
    props: true
  },
  {
    path: '/cohort/:id/edit',
    name: 'CohortEdit',
    component: CohortEdit,
    meta: {
      title: 'Edit Cohort'
    },
    props: true
  },
  {
    path: '/cohort/create',
    name: 'CohortCreate',
    component: CohortCreate,
    meta: {
      title: 'Create Cohort'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard for navigation
router.beforeEach((to, _from, next) => {
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - Cohort Manager` : 'Cohort Manager';
  next();
});

export default router;