<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { searchCohorts as searchCohortsApi } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import Notification from 'core/notification';
import CohortDelete from '../components/CohortDelete.vue';
import type { Cohort } from '../types/moodle-api';

// Initialize strings store
const stringsStore = useStringsStore();

// Define types

interface Pagination {
  page: number;
  perpage: number;
  total: number;
}

// State management
const router = useRouter();
const cohorts = ref<Cohort[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const pagination = reactive<Pagination>({
  page: 1,
  perpage: 5,
  total: 0
});

// Initialize the component
onMounted(async () => {
  await loadCohorts();
});

// Load cohorts with pagination
const loadCohorts = async () => {
  loading.value = true;

  try {
    const cohortsResponse = await searchCohortsApi({
      query: searchQuery.value,
      page: (pagination.page - 1),
      perpage: pagination.perpage
    });
    cohorts.value = cohortsResponse?.cohorts || [];
    pagination.total = cohortsResponse?.total || 0;
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Search cohorts
const searchCohorts = () => {
  pagination.page = 1;
  loadCohorts();
};

// Pagination handlers
const goToPage = (page: number) => {
  pagination.page = page;
  loadCohorts();
};

const prevPage = () => {
  if (pagination.page > 1) {
    goToPage(pagination.page - 1);
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(pagination.total / pagination.perpage);
  if (pagination.page < totalPages) {
    goToPage(pagination.page + 1);
  }
};

// Handle cohort deletion success
const handleDeleteSuccess = () => {
  loadCohorts();
};

// View cohort details
const viewCohort = (cohort: Cohort) => {
  // Navigate to cohort details page
  router.push(`cohort/${cohort.id}`);
};

// Navigation functions
const navigateToEdit = (cohort: Cohort) => {
  router.push(`/cohort/${cohort.id}/edit`);
};

// Calculate pagination info
const paginationInfo = computed(() => {
  const start = (pagination.page - 1) * pagination.perpage + 1;
  const end = Math.min(pagination.page * pagination.perpage, pagination.total);
  return `${start}-${end} of ${pagination.total}`;
});

const totalPages = computed(() => Math.ceil(pagination.total / pagination.perpage));
</script>

<template>
  <div class="container-fluid p-4">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h1 class="h2 mb-2 mb-md-0">{{ stringsStore.getString('cohortmanager') }}</h1>
      <div class="d-flex gap-2 mt-2 mt-md-0">
        <router-link to="cohort/create" class="btn btn-primary">
          <i class="fa fa-plus"></i> {{ stringsStore.getString('newcohort') }}
        </router-link>
      </div>
    </div>

    <!-- Search bar -->
    <div class="mb-4">
      <div class="row">
        <div class="col-md-8 col-lg-6">
          <div class="input-group">
            <input v-model="searchQuery" type="text" class="form-control"
              :placeholder="stringsStore.getString('searchcohorts')" @keyup.enter="searchCohorts" />
            <button class="btn btn-secondary" @click="searchCohorts">
              <i class="fa fa-search"></i> {{ stringsStore.getString('search') }}
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Loading state -->
    <div v-if="loading" class="text-center p-4">
      {{ stringsStore.getString('loading') }}
    </div>

    <!-- Empty state -->
    <div v-else-if="cohorts.length === 0" class="text-center py-5 text-muted">
      <i class="fa fa-users fa-3x mb-3"></i>
      <h3 class="mb-2">{{ stringsStore.getString('nocoortsfound') }}</h3>
      <p>{{ stringsStore.getString('nocoortsfounddesc') }}</p>
    </div>

    <!-- Cohort table -->
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="thead-light">
            <tr>
              <th class="w-50">{{ stringsStore.getString('name') }}</th>
              <th class="w-10">{{ stringsStore.getString('id') }}</th>
              <th class="w-30">{{ stringsStore.getString('description') }}</th>
              <th class="w-10 text-center">{{ stringsStore.getString('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cohort in cohorts" :key="cohort.id">
              <td>
                <a href="#" class="text-decoration-none" @click.prevent="viewCohort(cohort)">
                  <strong>{{ cohort.name }}</strong>
                </a>
              </td>
              <td class="text-center">{{ cohort.id }}</td>
              <td class="text-muted small" v-html="cohort.description || stringsStore.getString('nodescription')"></td>
              <td class="text-center">
                <div class="btn-group btn-group-sm" role="group">
                  <button class="btn btn-outline-primary" @click="navigateToEdit(cohort)"
                    :title="stringsStore.getString('editcohort')">
                    <i class="fa fa-edit"></i>
                  </button>
                  <CohortDelete :cohort="cohort" @success="handleDeleteSuccess" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-4">
      <nav aria-label="Cohort pagination">
        <ul class="pagination justify-content-center justify-content-md-start">
          <li class="page-item" :class="{ 'disabled': pagination.page === 1 }">
            <button class="page-link" @click="prevPage" :disabled="pagination.page === 1">
              <i class="fa fa-chevron-left"></i>
            </button>
          </li>

          <li class="page-item active">
            <span class="page-link">
              {{ paginationInfo }}
            </span>
          </li>

          <li class="page-item" :class="{ 'disabled': pagination.page === totalPages }">
            <button class="page-link" @click="nextPage" :disabled="pagination.page === totalPages">
              <i class="fa fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>