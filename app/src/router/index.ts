import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import CohortList from '@/pages/CohortList.vue';
import CohortDetail from '@/pages/CohortDetail.vue';
import CohortEdit from '@/pages/CohortEdit.vue';
import CohortCreate from '@/pages/CohortCreate.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/local/cohortmanager/',
    name: 'CohortList',
    component: CohortList,
    meta: {
      title: 'Cohort Manager'
    }
  },
  {
    path: '/local/cohortmanager/cohort/:id',
    name: 'CohortDetail',
    component: CohortDetail,
    meta: {
      title: 'Cohort Details'
    },
    props: true
  },
  {
    path: '/local/cohortmanager/cohort/:id/edit',
    name: 'CohortEdit',
    component: CohortEdit,
    meta: {
      title: 'Edit Cohort'
    },
    props: true
  },
  {
    path: '/local/cohortmanager/cohort/create',
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