import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Config from 'core/config';
import CohortList from '@/pages/CohortList.vue';
import CohortDetail from '@/pages/CohortDetail.vue';
import CohortEdit from '@/pages/CohortEdit.vue';
import CohortCreate from '@/pages/CohortCreate.vue';
import CohortCustomFields from '@/pages/CohortCustomFields.vue';
import RolesList from '@/pages/RolesList.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CohortList',
    component: CohortList,
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
  },
  {
    path: '/custom-fields',
    name: 'CohortCustomFields',
    component: CohortCustomFields,
    meta: {
      title: 'Custom Fields Management'
    }
  },
  {
    path: '/roles',
    name: 'RolesList',
    component: RolesList,
    meta: {
      title: 'Roles Management'
    }
  }
];

// Moodle may be installed under a subdirectory (e.g. /moodle50/). Derive the
// base path from Config.wwwroot so Vue Router matches the real URL instead of
// hardcoding it. index.php always serves this SPA at .../local/cohortmanager/,
// so the base is <wwwroot>/local/cohortmanager/.
const wwwrootPath = new URL(Config.wwwroot).pathname.replace(/\/+$/, '');
const base = `${wwwrootPath}/local/cohortmanager/`;

const router = createRouter({
  history: createWebHistory(base),
  routes
});

// Route guard for navigation
router.beforeEach((to, _from, next) => {
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - Cohort Manager` : 'Cohort Manager';
  next();
});

export default router;