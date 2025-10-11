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
    error.value = stringsStore.getString('failedtoloadcohorts', `Failed to load cohorts. Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
  router.push(`/cohort/${cohort.id}`);
};

// Navigation functions
const navigateToEdit = (cohort: Cohort) => {
  router.push(`/cohort/${cohort.id}/edit`);
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
  <div class="cohort-list">
    <!-- Header -->
    <div class="header">
      <h1>{{ stringsStore.getString('cohortmanager') }}</h1>
      <div class="header-actions">
        <router-link
          to="/cohort/create"
          class="btn btn-primary"
        >
          <i class="icon fa fa-plus"></i> {{ stringsStore.getString('newcohort') }}
        </router-link>
      </div>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
      <div class="search-input-group">
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          :placeholder="stringsStore.getString('searchcohorts', 'Search cohorts...')"
          @keyup.enter="searchCohorts"
        />
        <button class="btn btn-search" @click="searchCohorts">
          <i class="icon fa fa-search"></i> {{ stringsStore.getString('search', 'Search') }}
        </button>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      {{ stringsStore.getString('loading', 'Loading...') }}
    </div>

    <!-- Empty state -->
    <div v-else-if="cohorts.length === 0" class="empty-state">
      <i class="icon fa fa-users"></i>
      <h3>{{ stringsStore.getString('nocoortsfound', 'No cohorts found') }}</h3>
      <p>{{ stringsStore.getString('nocoortsfounddesc', 'Create your first cohort to get started.') }}</p>
    </div>

    <!-- Cohort table -->
    <div v-else class="cohort-table">
      <div class="cohort-table-header">
        <div class="cohort-table-cell">{{ stringsStore.getString('name', 'Name') }}</div>
        <div class="cohort-table-cell">{{ stringsStore.getString('id', 'ID') }}</div>
        <div class="cohort-table-cell">{{ stringsStore.getString('description', 'Description') }}</div>
        <div class="cohort-table-cell">{{ stringsStore.getString('members', 'Members') }}</div>
        <div class="cohort-table-cell">{{ stringsStore.getString('actions', 'Actions') }}</div>
      </div>
      
      <div class="cohort-table-body">
        <div
          v-for="cohort in cohorts"
          :key="cohort.id"
          class="cohort-row"
        >
          <div class="cohort-table-cell cohort-name">
            <a
              href="#"
              class="cohort-link"
              @click.prevent="viewCohort(cohort)"
            >
              {{ cohort.name }}
            </a>
          </div>
          <div class="cohort-table-cell">{{ cohort.id }}</div>
          <div class="cohort-table-cell cohort-description">
            {{ cohort.description || stringsStore.getString('nodescription', 'No description') }}
          </div>
          <div class="cohort-table-cell cohort-actions">
            <button
              class="btn btn-sm btn-edit"
              @click="navigateToEdit(cohort)"
              :title="stringsStore.getString('editcohort', 'Edit cohort')"
            >
              <i class="icon fa fa-edit"></i>
            </button>
            <button
              class="btn btn-sm btn-delete"
              @click="deleteCohort(cohort)"
              :title="stringsStore.getString('deletecohort', 'Delete cohort')"
            >
              <i class="icon fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="btn btn-pagination"
        @click="prevPage"
        :disabled="pagination.page === 1"
      >
        <i class="icon fa fa-chevron-left"></i>
      </button>
      
      <span class="pagination-info">
        {{ paginationInfo }}
      </span>
      
      <button
        class="btn btn-pagination"
        @click="nextPage"
        :disabled="pagination.page === totalPages"
      >
        <i class="icon fa fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.cohort-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.header h1 {
  margin: 0;
  color: #333;
  font-size: 28px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input-group {
  display: flex;
  gap: 10px;
  max-width: 500px;
}

.search-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-search {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #495057;
}

.btn-search:hover {
  background-color: #e9ecef;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

.btn-edit {
  background-color: #28a745;
  color: white;
}

.btn-edit:hover {
  background-color: #1e7e34;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-pagination {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #495057;
  padding: 8px 12px;
}

.btn-pagination:hover:not(:disabled) {
  background-color: #e9ecef;
}

.btn-pagination:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.cohort-table {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.cohort-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
  color: #495057;
  padding: 12px 15px;
}

.cohort-table-cell {
  padding: 12px 15px;
  border-right: 1px solid #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cohort-table-cell:last-child {
  border-right: none;
}

.cohort-table-body {
  max-height: 500px;
  overflow-y: auto;
}

.cohort-row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.cohort-row:hover {
  background-color: #f8f9fa;
}

.cohort-name {
  font-weight: 500;
}

.cohort-link {
  color: #007bff;
  text-decoration: none;
}

.cohort-link:hover {
  text-decoration: underline;
}

.cohort-description {
  color: #666;
  font-size: 14px;
}

.cohort-actions {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-secondary {
  background-color: #e2e3e5;
  color: #383d41;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-state i {
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #333;
}

/* Responsive design */
@media (max-width: 768px) {
  .cohort-list {
    padding: 10px;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .search-input-group {
    max-width: 100%;
  }
  
  .cohort-table-header,
  .cohort-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .cohort-table-header {
    display: none;
  }
  
  .cohort-row {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 15px;
  }
  
  .cohort-table-cell {
    border-right: none;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  
  .cohort-table-cell:last-child {
    border-bottom: none;
  }
  
  .cohort-name {
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .cohort-actions {
    justify-content: flex-start;
  }
}
</style>