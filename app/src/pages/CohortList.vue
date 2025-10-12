<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { searchCohorts as searchCohortsApi, deleteCohorts } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import type { Cohort } from '../types/moodle-api';

// Initialize strings store
const stringsStore = useStringsStore();

// Define types

interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

// State management
const router = useRouter();
const cohorts = ref<Cohort[]>([]);
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const pagination = reactive<Pagination>({
  page: 1,
  perPage: 10,
  total: 0
});

// Initialize the component
onMounted(async () => {
  await loadCohorts();
});

// Load cohorts with pagination
const loadCohorts = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const cohortsResponse = await searchCohortsApi({
      query: searchQuery.value,
      context: {
        contextlevel: 'system'
      },
      includes: 'all',
      limitfrom: (pagination.page - 1) * pagination.perPage,
      limitnum: pagination.perPage
    });
    cohorts.value = cohortsResponse?.cohorts || [];
    pagination.total = cohortsResponse?.total || 0;
  } catch (err) {
    console.error('Error loading cohorts:', err);
    console.error('Error details:', err);
    error.value = stringsStore.getString('failedtoloadcohorts');
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
  const totalPages = Math.ceil(pagination.total / pagination.perPage);
  if (pagination.page < totalPages) {
    goToPage(pagination.page + 1);
  }
};

// Delete cohort
const deleteCohort = async (cohort: Cohort) => {
  const confirmationMessage = stringsStore.getString('deleteconfirmation', `Are you sure you want to delete "${cohort.name}"?`);
  if (!confirm(confirmationMessage)) {
    return;
  }

  try {
    await deleteCohorts({
      cohortids: [cohort.id]
    });
    
    // Refresh the list
    await loadCohorts();
  } catch (err) {
    console.error('Error deleting cohort:', err);
    error.value = stringsStore.getString('failedtodeletecohort', 'Failed to delete cohort. Please try again.');
  }
};

// View cohort details
const viewCohort = (cohort: Cohort) => {
  // Navigate to cohort details page
  router.push(`/local/cohortmanager/cohort/${cohort.id}`);
};

// Navigation functions
const navigateToEdit = (cohort: Cohort) => {
  router.push(`/local/cohortmanager/cohort/${cohort.id}/edit`);
};

// Calculate pagination info
const paginationInfo = computed(() => {
  const start = (pagination.page - 1) * pagination.perPage + 1;
  const end = Math.min(pagination.page * pagination.perPage, pagination.total);
  return `${start}-${end} of ${pagination.total}`;
});

const totalPages = computed(() => Math.ceil(pagination.total / pagination.perPage));
</script>

<template>
  <div class="container-fluid p-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h1 class="h2 mb-0">{{ stringsStore.getString('cohortmanager') }}</h1>
      <div class="d-flex gap-2">
        <router-link
          to="/local/cohortmanager/cohort/create"
          class="btn btn-primary"
        >
          <i class="icon fa fa-plus"></i> {{ stringsStore.getString('newcohort') }}
        </router-link>
      </div>
    </div>

    <!-- Search bar -->
    <div class="mb-4">
      <div class="d-flex gap-2" style="max-width: 500px;">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          :placeholder="stringsStore.getString('searchcohorts')"
          @keyup.enter="searchCohorts"
        />
        <button class="btn btn-secondary" @click="searchCohorts">
          <i class="icon fa fa-search"></i> {{ stringsStore.getString('search') }}
        </button>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center p-4">
      {{ stringsStore.getString('loading') }}
    </div>

    <!-- Empty state -->
    <div v-else-if="cohorts.length === 0" class="text-center py-5 text-muted">
      <i class="icon fa fa-users fa-3x mb-3"></i>
      <h3 class="mb-2">{{ stringsStore.getString('nocoortsfound') }}</h3>
      <p>{{ stringsStore.getString('nocoortsfounddesc') }}</p>
    </div>

    <!-- Cohort table -->
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="thead-light">
            <tr>
              <th>{{ stringsStore.getString('name', 'Name') }}</th>
              <th>{{ stringsStore.getString('id', 'ID') }}</th>
              <th>{{ stringsStore.getString('description', 'Description') }}</th>
              <th>{{ stringsStore.getString('members', 'Members') }}</th>
              <th>{{ stringsStore.getString('actions', 'Actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cohort in cohorts"
              :key="cohort.id"
            >
              <td>
                <a
                  href="#"
                  class="text-decoration-none"
                  @click.prevent="viewCohort(cohort)"
                >
                  <strong>{{ cohort.name }}</strong>
                </a>
              </td>
              <td>{{ cohort.id }}</td>
              <td class="text-muted small">
                {{ cohort.description || stringsStore.getString('nodescription') }}
              </td>
              <td class="d-flex gap-1 justify-content-start">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="navigateToEdit(cohort)"
                  :title="stringsStore.getString('editcohort', 'Edit cohort')"
                >
                  <i class="icon fa fa-edit"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteCohort(cohort)"
                  :title="stringsStore.getString('deletecohort', 'Delete cohort')"
                >
                  <i class="icon fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-4">
      <nav aria-label="Cohort pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': pagination.page === 1 }">
            <button
              class="page-link"
              @click="prevPage"
              :disabled="pagination.page === 1"
            >
              <i class="icon fa fa-chevron-left"></i>
            </button>
          </li>
          
          <li class="page-item active">
            <span class="page-link">
              {{ paginationInfo }}
            </span>
          </li>
          
          <li class="page-item" :class="{ 'disabled': pagination.page === totalPages }">
            <button
              class="page-link"
              @click="nextPage"
              :disabled="pagination.page === totalPages"
            >
              <i class="icon fa fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
</style>