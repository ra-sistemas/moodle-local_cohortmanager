import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import components
const App = () => import('../App.vue');
const CohortDetail = () => import('./CohortDetail.vue');
const CohortEdit = () => import('./CohortEdit.vue');
const CohortCreate = () => import('./CohortCreate.vue');

const routes: Array<RouteRecordRaw> = [
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
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - Cohort Manager` : 'Cohort Manager';
  next();
});

export default router;