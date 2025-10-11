<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ajax } from './utils/moodle';

// Define types
interface Cohort {
  id: number;
  name: string;
  idnumber: string;
  description: string;
  descriptionformat: number;
  visible: boolean;
  theme?: string;
  customfields?: Array<{
    name: string;
    shortname: string;
    type: string;
    valueraw: string;
    value: string;
  }>;
}

interface CohortMember {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

// Props
const props = defineProps<{
  id: number;
}>();

// State management
const router = useRouter();
const cohort = ref<Cohort | null>(null);
const members = ref<CohortMember[]>([]);
const loading = ref(false);
const error = ref('');
const activeTab = ref('details');

// Load cohort details
const loadCohort = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await ajax('core_cohort_get_cohorts', {
      cohortids: [props.id]
    });
    
    if ((response as any) && (response as any).length > 0) {
      cohort.value = (response as any)[0];
      await loadMembers();
    } else {
      error.value = 'Cohort not found';
    }
  } catch (err) {
    console.error('Error loading cohort:', err);
    error.value = 'Failed to load cohort details. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Load cohort members
const loadMembers = async () => {
  try {
    const response = await ajax('core_cohort_get_cohort_members', {
      cohortids: [props.id]
    });
    
    if ((response as any) && (response as any)[props.id]) {
      members.value = (response as any)[props.id];
    }
  } catch (err) {
    console.error('Error loading cohort members:', err);
    // Don't show error for members as it's not critical
  }
};

// Navigate back to list
const goBack = () => {
  router.push('/');
};

// Edit cohort
const editCohort = () => {
  router.push(`/cohort/${props.id}/edit`);
};

// Delete cohort
const deleteCohort = async () => {
  if (!cohort.value) return;
  
  if (!confirm(`Are you sure you want to delete "${cohort.value.name}"?`)) {
    return;
  }

  try {
    await ajax('core_cohort_delete_cohorts', {
      cohortids: [props.id]
    });
    
    // Navigate back to list
    router.push('/');
  } catch (err) {
    console.error('Error deleting cohort:', err);
    error.value = 'Failed to delete cohort. Please try again.';
  }
};

// Initialize the component
onMounted(() => {
  loadCohort();
});
</script>

<template>
  <div class="cohort-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <i class="icon fa fa-spinner fa-spin"></i> Loading cohort details...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      {{ error }}
      <button @click="loadCohort" class="btn btn-refresh">
        <i class="icon fa fa-refresh"></i> Retry
      </button>
    </div>

    <!-- Content -->
    <div v-else-if="cohort" class="cohort-detail-content">
      <!-- Header -->
      <div class="detail-header">
        <div class="header-actions">
          <button @click="goBack" class="btn btn-secondary">
            <i class="icon fa fa-arrow-left"></i> Back to List
          </button>
          <button @click="editCohort" class="btn btn-edit">
            <i class="icon fa fa-edit"></i> Edit
          </button>
          <button @click="deleteCohort" class="btn btn-delete">
            <i class="icon fa fa-trash"></i> Delete
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button 
          :class="['tab', { active: activeTab === 'details' }]"
          @click="activeTab = 'details'"
        >
          Details
        </button>
        <button 
          :class="['tab', { active: activeTab === 'members' }]"
          @click="activeTab = 'members'"
        >
          Members ({{ members.length }})
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Details Tab -->
        <div v-if="activeTab === 'details'" class="details-tab">
          <div class="detail-section">
            <h3>Basic Information</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <label>Name:</label>
                <span>{{ cohort.name }}</span>
              </div>
              <div class="detail-item">
                <label>ID Number:</label>
                <span>{{ cohort.idnumber }}</span>
              </div>
              <div class="detail-item">
                <label>Visibility:</label>
                <span :class="['badge', cohort.visible ? 'badge-success' : 'badge-secondary']">
                  {{ cohort.visible ? 'Visible' : 'Hidden' }}
                </span>
              </div>
              <div v-if="cohort.theme" class="detail-item">
                <label>Theme:</label>
                <span>{{ cohort.theme }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3>Description</h3>
            <div class="description-content">
              <div v-if="cohort.description" v-html="cohort.description"></div>
              <div v-else class="no-description">
                No description provided.
              </div>
            </div>
          </div>

          <div v-if="cohort.customfields && cohort.customfields.length > 0" class="detail-section">
            <h3>Custom Fields</h3>
            <div class="custom-fields">
              <div 
                v-for="field in cohort.customfields" 
                :key="field.shortname"
                class="custom-field"
              >
                <label>{{ field.name }}:</label>
                <span>{{ field.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Members Tab -->
        <div v-if="activeTab === 'members'" class="members-tab">
          <div class="members-header">
            <h3>Cohort Members</h3>
            <span class="member-count">{{ members.length }} members</span>
          </div>

          <div v-if="members.length > 0" class="members-list">
            <div class="member-table">
              <div class="member-table-header">
                <div class="member-table-cell">Name</div>
                <div class="member-table-cell">Username</div>
                <div class="member-table-cell">Email</div>
              </div>
              
              <div class="member-table-body">
                <div 
                  v-for="member in members" 
                  :key="member.id"
                  class="member-row"
                >
                  <div class="member-table-cell member-name">
                    {{ member.firstname }} {{ member.lastname }}
                  </div>
                  <div class="member-table-cell">{{ member.username }}</div>
                  <div class="member-table-cell">{{ member.email }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="no-members">
            <i class="icon fa fa-users"></i>
            <p>No members found in this cohort.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found">
      <i class="icon fa fa-exclamation-triangle"></i>
      <h3>Cohort Not Found</h3>
      <p>The requested cohort could not be found.</p>
      <button @click="goBack" class="btn btn-primary">
        Back to Cohort List
      </button>
    </div>
  </div>
</template>

<style scoped>
.cohort-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-header {
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
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

.btn-refresh {
  background-color: #17a2b8;
  color: white;
}

.btn-refresh:hover {
  background-color: #138496;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab {
  padding: 12px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab:hover {
  color: #333;
}

.tab.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-content {
  min-height: 400px;
}

.detail-section {
  margin-bottom: 30px;
}

.detail-section h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-item label {
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.detail-item span {
  color: #333;
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

.description-content {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 15px;
  min-height: 100px;
}

.no-description {
  color: #666;
  font-style: italic;
}

.custom-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.custom-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.custom-field label {
  font-weight: 600;
  color: #666;
}

.members-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.member-count {
  background-color: #007bff;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
}

.member-table {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.member-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
  color: #495057;
  padding: 12px 15px;
}

.member-table-cell {
  padding: 12px 15px;
  border-right: 1px solid #eee;
}

.member-table-cell:last-child {
  border-right: none;
}

.member-table-body {
  max-height: 400px;
  overflow-y: auto;
}

.member-row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.member-row:hover {
  background-color: #f8f9fa;
}

.member-name {
  font-weight: 500;
}

.no-members {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-members i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 15px;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #666;
}

.not-found i {
  font-size: 48px;
  color: #ffc107;
  margin-bottom: 15px;
}

.not-found h3 {
  margin: 0 0 10px 0;
  color: #333;
}

/* Responsive design */
@media (max-width: 768px) {
  .cohort-detail {
    padding: 10px;
  }
  
  .header-actions {
    flex-wrap: wrap;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .member-table-header,
  .member-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .member-table-header {
    display: none;
  }
  
  .member-row {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 15px;
  }
  
  .member-table-cell {
    border-right: none;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  
  .member-table-cell:last-child {
    border-bottom: none;
  }
  
  .member-name {
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .tabs {
    overflow-x: auto;
  }
  
  .tab {
    white-space: nowrap;
  }
}
</style>