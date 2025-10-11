<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { searchCohorts as searchCohortsApi, createCohorts, updateCohorts, deleteCohorts } from './utils/moodle';
import type { Cohort } from './types/moodle-api';

// Define types

interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

// State management
const router = useRouter();
const route = useRoute();
const cohorts = ref<Cohort[]>([]);
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const pagination = reactive<Pagination>({
  page: 1,
  perPage: 10,
  total: 0
});

// Only show content on home page
const showList = computed(() => route?.path === '/');

// Initialize the component
onMounted(async () => {
  if (showList.value) {
    await loadCohorts();
  }
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
    error.value = `Failed to load cohorts. Error: ${err instanceof Error ? err.message : 'Unknown error'}`;
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
  if (!confirm(`Are you sure you want to delete "${cohort.name}"?`)) {
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
    error.value = 'Failed to delete cohort. Please try again.';
  }
};

// View cohort details
const viewCohort = (cohort: Cohort) => {
  // Navigate to cohort details page
  router.push(`/cohort/${cohort.id}`);
};


// Form state
const showCreateForm = ref(false);
const showEditForm = ref(false);
const showForm = computed(() => showCreateForm.value || showEditForm.value);
const formTitle = computed(() => showCreateForm.value ? 'Create New Cohort' : 'Edit Cohort');
const formData = reactive<Cohort>({
  id: 0,
  name: '',
  idnumber: '',
  description: '',
  descriptionformat: 1,
  visible: true,
  theme: '',
  customfields: []
});

const submitForm = async () => {
  try {
    if (showCreateForm.value) {
      await createCohorts({
        cohorts: [formData]
      });
    } else {
      await updateCohorts({
        cohorts: [formData]
      });
    }
    
    // Reset form and close modal
    Object.assign(formData, {
      id: 0,
      name: '',
      idnumber: '',
      description: '',
      descriptionformat: 1,
      visible: true,
      theme: '',
      customfields: []
    });
    
    showCreateForm.value = false;
    showEditForm.value = false;
    
    // Refresh the list
    await loadCohorts();
  } catch (err) {
    console.error('Error saving cohort:', err);
    error.value = 'Failed to save cohort. Please try again.';
  }
};

</script>

<template>
  <div class="cohort-manager">
    <!-- Header -->
    <div class="header">
      <h1>Cohort Manager</h1>
      <div class="header-actions">
        <button
          @click="showCreateForm = true"
          class="btn btn-primary"
        >
          <i class="icon fa fa-plus"></i> New Cohort
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <div class="search-input-group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search cohorts..."
          class="search-input"
          @keyup.enter="searchCohorts"
        />
        <button @click="searchCohorts" class="btn btn-search">
          <i class="icon fa fa-search"></i>
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <i class="icon fa fa-spinner fa-spin"></i> Loading cohorts...
    </div>

    <!-- Cohort List -->
    <div v-else-if="cohorts.length > 0" class="cohort-list">
      <div class="cohort-table">
        <div class="cohort-table-header">
          <div class="cohort-table-cell">Name</div>
          <div class="cohort-table-cell">ID Number</div>
          <div class="cohort-table-cell">Description</div>
          <div class="cohort-table-cell">Visible</div>
          <div class="cohort-table-cell">Actions</div>
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
                @click.prevent="viewCohort(cohort)"
                class="cohort-link"
              >
                {{ cohort.name }}
              </a>
            </div>
            <div class="cohort-table-cell">{{ cohort.idnumber }}</div>
            <div class="cohort-table-cell cohort-description">
              {{ cohort.description || 'No description' }}
            </div>
            <div class="cohort-table-cell">
              <span :class="['badge', cohort.visible ? 'badge-success' : 'badge-secondary']">
                {{ cohort.visible ? 'Visible' : 'Hidden' }}
              </span>
            </div>
            <div class="cohort-table-cell cohort-actions">
              <button 
                @click="showEditForm = true; formData.id = cohort.id; formData.name = cohort.name; formData.idnumber = cohort.idnumber; formData.description = cohort.description; formData.visible = cohort.visible; formData.theme = cohort.theme || ''"
                class="btn btn-sm btn-edit"
                title="Edit"
              >
                <i class="icon fa fa-edit"></i>
              </button>
              <button 
                @click="deleteCohort(cohort)" 
                class="btn btn-sm btn-delete"
                title="Delete"
              >
                <i class="icon fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          @click="prevPage" 
          :disabled="pagination.page === 1"
          class="btn btn-pagination"
        >
          <i class="icon fa fa-chevron-left"></i>
        </button>
        
        <div class="pagination-info">
          Page {{ pagination.page }} of {{ Math.ceil(pagination.total / pagination.perPage) || 1 }}
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="pagination.page >= Math.ceil(pagination.total / pagination.perPage)"
          class="btn btn-pagination"
        >
          <i class="icon fa fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <i class="icon fa fa-users fa-3x"></i>
      <h3>No cohorts found</h3>
      <p v-if="!loading && !error">
        Create your first cohort to get started.
      </p>
      <button
        @click="showCreateForm = true"
        class="btn btn-primary"
      >
        Create New Cohort
      </button>
    </div>

    <!-- Form Modal -->
    <div v-if="showForm" class="modal-overlay" @click="showForm = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ formTitle }}</h2>
          <button @click="showForm = false" class="btn btn-close">
            <i class="icon fa fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label for="name">Cohort Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-control"
              placeholder="Enter cohort name"
            />
          </div>
          
          <div class="form-group">
            <label for="idnumber">ID Number *</label>
            <input
              id="idnumber"
              v-model="formData.idnumber"
              type="text"
              class="form-control"
              placeholder="Enter ID number"
            />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-control"
              rows="3"
              placeholder="Enter cohort description"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label>
              <input
                v-model="formData.visible"
                type="checkbox"
                class="form-checkbox"
              />
              Visible
            </label>
          </div>
          
          <div class="form-group">
            <label for="theme">Theme</label>
            <select
              id="theme"
              v-model="formData.theme"
              class="form-control"
            >
              <option value="">Default Theme</option>
              <option value="boost">Boost</option>
              <option value="boost-clean">Boost Clean</option>
            </select>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="showForm = false" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="submitForm" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cohort-manager {
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

.btn-close {
  background: none;
  border: none;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  padding: 5px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-checkbox {
  margin-right: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  .cohort-manager {
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
  
  .modal-content {
    width: 95%;
    margin: 20px;
  }
}
</style>
