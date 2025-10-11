<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createCohorts } from './utils/moodle';

// State management
const router = useRouter();
const submitting = ref(false);
const error = ref('');

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

    const createdCohorts = await createCohorts({
      cohorts: [cohortData]
    });

    // Navigate to the newly created cohort details
    if (createdCohorts && createdCohorts.length > 0) {
      const newCohortId = createdCohorts[0].id;
      router.push(`/cohort/${newCohortId}`);
    }
  } catch (err) {
    console.error('Error creating cohort:', err);
    error.value = 'Failed to create cohort. Please try again.';
  } finally {
    submitting.value = false;
  }
};

// Reset form
const resetForm = () => {
  formData.value = {
    name: '',
    idnumber: '',
    description: '',
    visible: true,
    theme: '',
    categorytype: {
      type: 'system',
      value: ''
    }
  };
  error.value = '';
};

// Navigate back
const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="cohort-create">
    <!-- Header -->
    <div class="form-header">
      <h1>Create New Cohort</h1>
      <div class="header-actions">
        <button @click="goBack" class="btn btn-secondary">
          <i class="icon fa fa-times"></i> Cancel
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="resetForm" class="btn btn-refresh">
        <i class="icon fa fa-refresh"></i> Reset Form
      </button>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="cohort-form">
      <div class="form-section">
        <h2>Basic Information</h2>
        
        <div class="form-group">
          <label for="name">Cohort Name *</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="form-control"
            placeholder="Enter cohort name"
            required
          />
          <div class="form-help">The display name of the cohort</div>
        </div>
        
        <div class="form-group">
          <label for="idnumber">ID Number *</label>
          <input
            id="idnumber"
            v-model="formData.idnumber"
            type="text"
            class="form-control"
            placeholder="Enter ID number"
            required
          />
          <div class="form-help">A unique identifier for the cohort</div>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-control"
            rows="4"
            placeholder="Enter cohort description"
          ></textarea>
          <div class="form-help">A detailed description of the cohort</div>
        </div>
      </div>

      <div class="form-section">
        <h2>Settings</h2>
        
        <div class="form-group">
          <label class="checkbox-label">
            <input
              v-model="formData.visible"
              type="checkbox"
              class="form-checkbox"
            />
            Visible
          </label>
          <div class="form-help">Make the cohort visible to users</div>
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
          <div class="form-help">Select a theme for the cohort (requires allowcohortthemes to be enabled)</div>
        </div>

        <div class="form-group">
          <label>Category</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                v-model="formData.categorytype.type"
                type="radio"
                value="system"
                class="form-radio"
              />
              System Category
            </label>
            <label class="radio-label">
              <input
                v-model="formData.categorytype.type"
                type="radio"
                value="idnumber"
                class="form-radio"
              />
              Course Category by ID Number
            </label>
            <label class="radio-label">
              <input
                v-model="formData.categorytype.type"
                type="radio"
                value="id"
                class="form-radio"
              />
              Course Category by ID
            </label>
          </div>
          <div v-if="formData.categorytype.type !== 'system'" class="form-help">
            Enter the {{ formData.categorytype.type === 'idnumber' ? 'ID number' : 'ID' }} of the course category:
            <input
              v-model="formData.categorytype.value"
              type="text"
              class="form-control"
              :placeholder="`Enter course category ${formData.categorytype.type === 'idnumber' ? 'ID number' : 'ID'}`"
            />
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button 
          type="button" 
          @click="resetForm" 
          class="btn btn-secondary"
          :disabled="submitting"
        >
          <i class="icon fa fa-undo"></i> Reset
        </button>
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="submitting"
        >
          <i class="icon fa fa-plus"></i>
          {{ submitting ? 'Creating...' : 'Create Cohort' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.cohort-create {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.form-header h1 {
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

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
}

.form-radio {
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

/* Responsive design */
@media (max-width: 768px) {
  .cohort-create {
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