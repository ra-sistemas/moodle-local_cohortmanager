<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCohorts, updateCohorts } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import type { Cohort } from '../types/moodle-api';

// Initialize strings store
const stringsStore = useStringsStore();

// Define types

// Props
const props = defineProps<{
  id: number;
}>();

// State management
const router = useRouter();
const cohort = ref<Cohort | null>(null);
const loading = ref(false);
const error = ref('');
const submitting = ref(false);

// Form data
const formData = ref({
  name: '',
  idnumber: '',
  description: '',
  visible: true,
  theme: '',
  categorytype: {
    type: 'system',
    value: ''
  }
});

// Load cohort data
const loadCohort = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const cohortsList = await getCohorts({
      cohortids: [props.id]
    });
    
    if (cohortsList && cohortsList.length > 0) {
      cohort.value = cohortsList[0];
      // Populate form data
      formData.value = {
        name: cohort.value!.name,
        idnumber: cohort.value!.idnumber,
        description: cohort.value!.description,
        visible: cohort.value!.visible,
        theme: cohort.value!.theme || '',
        categorytype: {
          type: 'system',
          value: ''
        }
      };
    } else {
      error.value = stringsStore.getString('cohortnotfound', 'Cohort not found');
    }
  } catch (err) {
    console.error('Error loading cohort:', err);
    error.value = stringsStore.getString('failedtoloadcohortdata', 'Failed to load cohort data. Please try again.');
  } finally {
    loading.value = false;
  }
};

// Submit form
const submitForm = async () => {
  if (!formData.value.name.trim()) {
    alert('Please enter a cohort name');
    return;
  }

  if (!formData.value.idnumber.trim()) {
    alert('Please enter an ID number');
    return;
  }

  submitting.value = true;
  
  try {
    const cohortData = {
      categorytype: formData.value.categorytype,
      name: formData.value.name,
      idnumber: formData.value.idnumber,
      description: formData.value.description,
      descriptionformat: 1, // FORMAT_HTML
      visible: formData.value.visible,
      theme: formData.value.theme || undefined
    };

    await updateCohorts({
      cohorts: [{
        ...cohortData,
        id: props.id
      }]
    });

    // Navigate to cohort details
    router.push(`/local/cohortmanager/cohort/${props.id}`);
  } catch (err) {
    console.error('Error updating cohort:', err);
    error.value = stringsStore.getString('failedtoupdatecohort', 'Failed to update cohort. Please try again.');
  } finally {
    submitting.value = false;
  }
};

// Navigate back
const goBack = () => {
  router.push(`/local/cohortmanager/cohort/${props.id}`);
};

// Initialize the component
onMounted(() => {
  loadCohort();
});
</script>

<template>
  <div class="cohort-edit">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <i class="icon fa fa-spinner fa-spin"></i> {{ stringsStore.getString('loadingcohortdata') }}
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      {{ error }}
      <button @click="loadCohort" class="btn btn-refresh">
        <i class="icon fa fa-refresh"></i> {{ stringsStore.getString('retry') }}
      </button>
    </div>

    <!-- Form -->
    <div v-else-if="cohort" class="edit-form">
      <!-- Header -->
      <div class="header">
        <h1>{{ stringsStore.getString('editcohort') }}</h1>
        <div class="header-actions">
          <button @click="goBack" class="btn btn-secondary">
            <i class="icon fa fa-times"></i> {{ stringsStore.getString('cancel') }}
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="submitForm" class="cohort-form">
        <div class="form-section">
          <h2>{{ stringsStore.getString('basicinformation') }}</h2>
          
          <div class="form-group">
            <label for="name">{{ stringsStore.getString('cohortname') }} *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-control"
              :placeholder="stringsStore.getString('entercohortname')"
              required
            />
            <div class="form-help">{{ stringsStore.getString('cohortnamedescription') }}</div>
          </div>
          
          <div class="form-group">
            <label for="idnumber">{{ stringsStore.getString('idnumber') }} *</label>
            <input
              id="idnumber"
              v-model="formData.idnumber"
              type="text"
              class="form-control"
              :placeholder="stringsStore.getString('enteridnumber')"
              required
            />
            <div class="form-help">{{ stringsStore.getString('idnumberdescription') }}</div>
          </div>
          
          <div class="form-group">
            <label for="description">{{ stringsStore.getString('description') }}</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-control"
              rows="4"
              :placeholder="stringsStore.getString('entercohortdescription')"
            ></textarea>
            <div class="form-help">{{ stringsStore.getString('cohortdescription') }}</div>
          </div>
        </div>

        <div class="form-section">
          <h2>{{ stringsStore.getString('settings') }}</h2>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input
                v-model="formData.visible"
                type="checkbox"
                class="form-checkbox"
              />
              {{ stringsStore.getString('visible') }}
            </label>
            <div class="form-help">{{ stringsStore.getString('makecohortvisible') }}</div>
          </div>
          
          <div class="form-group">
            <label for="theme">{{ stringsStore.getString('theme') }}</label>
            <select
              id="theme"
              v-model="formData.theme"
              class="form-control"
            >
              <option value="">{{ stringsStore.getString('defaulttheme') }}</option>
              <option value="boost">{{ stringsStore.getString('boost') }}</option>
              <option value="boost-clean">{{ stringsStore.getString('boostclean') }}</option>
            </select>
            <div class="form-help">{{ stringsStore.getString('themedescription') }}</div>
          </div>
        </div>

        <!-- Custom Fields Section -->
        <div v-if="cohort.customfields && cohort.customfields.length > 0" class="form-section">
          <h2>{{ stringsStore.getString('customfields') }}</h2>
          
          <div
            v-for="field in cohort.customfields"
            :key="field.shortname"
            class="form-group"
          >
            <label :for="`custom-${field.shortname}`">{{ field.name }}</label>
            <input
              :id="`custom-${field.shortname}`"
              v-model="field.value"
              :type="field.type === 'text' ? 'text' : 'text'"
              class="form-control"
              :placeholder="`Enter ${field.name}`"
            />
            <div class="form-help">{{ field.name }}</div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button
            type="button"
            @click="goBack"
            class="btn btn-secondary"
            :disabled="submitting"
          >
            <i class="icon fa fa-times"></i> {{ stringsStore.getString('cancel') }}
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="submitting"
          >
            <i class="icon fa fa-save"></i>
            {{ submitting ? stringsStore.getString('saving') : stringsStore.getString('savechanges') }}
          </button>
        </div>
      </form>
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found">
      <i class="icon fa fa-exclamation-triangle"></i>
      <h3>{{ stringsStore.getString('cohortnotfound') }}</h3>
      <p>{{ stringsStore.getString('cohortnotfound') + ' data.' }}</p>
      <button @click="goBack" class="btn btn-primary">
        {{ stringsStore.getString('backtocohortlist') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cohort-edit {
  max-width: 800px;
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

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
}

.btn-refresh {
  background-color: #17a2b8;
  color: white;
}

.btn-refresh:hover {
  background-color: #138496;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cohort-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-section {
  padding: 30px;
  border-bottom: 1px solid #e0e0e0;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-control::placeholder {
  color: #999;
}

.form-help {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
}

.form-checkbox {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.form-actions {
  padding: 20px 30px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #e0e0e0;
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
  .cohort-edit {
    padding: 10px;
  }
  
  .form-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .form-section {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>