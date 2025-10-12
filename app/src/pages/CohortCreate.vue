<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createCohorts } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import { useAppStore } from '../stores/app';
import { add } from 'core/toast';
import ThemeSelect from '../components/ThemeSelect.vue';
import ContextSelect from '../components/ContextSelect.vue';
import Notification from 'core/notification';

// Initialize stores
const stringsStore = useStringsStore();
const appStore = useAppStore();

// State management
const router = useRouter();
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

// Submit form
const submitForm = async () => {
  if (!formData.value.name.trim()) {
    add(stringsStore.getString('pleaseentercohortname'), 'error');
    return;
  }

  if (!formData.value.idnumber.trim()) {
    add(stringsStore.getString('pleaseenteridnumber'), 'error');
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

    // Show success toast
    add(stringsStore.getString('cohortcreatedsuccessfully'), 'success');
    
    // Navigate to the newly created cohort details
    if (createdCohorts && createdCohorts.length > 0) {
      const newCohortId = createdCohorts[0].id;
      router.push(`/local/cohortmanager/cohort/${newCohortId}`);
    }
  } catch (err) {
    Notification.exception(err);
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
};

// Navigate back
const goBack = () => {
  router.push('/local/cohortmanager/');
};
</script>

<template>
  <div class="container">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h1 class="h3 mb-0">{{ stringsStore.getString('createnewcohort') }}</h1>
      <div>
        <button @click="goBack" class="btn btn-secondary">
          <i class="icon fa fa-times"></i>
        </button>
      </div>
    </div>


    <!-- Form -->
    <form @submit.prevent="submitForm" class="card">
      <div class="card-body">
        <h2 class="h5 mb-4">{{ stringsStore.getString('basicinformation') }}</h2>
        
        <div class="mb-4">
          <label for="name" class="form-label">{{ stringsStore.getString('cohortname') }} *</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="form-control"
            :placeholder="stringsStore.getString('entercohortname')"
            required
          />
          <div class="form-text">{{ stringsStore.getString('cohortnamedescription') }}</div>
        </div>
        
        <div class="mb-4">
          <label for="idnumber" class="form-label">{{ stringsStore.getString('idnumber') }} *</label>
          <input
            id="idnumber"
            v-model="formData.idnumber"
            type="text"
            class="form-control"
            :placeholder="stringsStore.getString('enteridnumber')"
            required
          />
          <div class="form-text">{{ stringsStore.getString('idnumberdescription') }}</div>
        </div>
        
        <div class="mb-4">
          <label for="description" class="form-label">{{ stringsStore.getString('description') }}</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-control"
            rows="4"
            :placeholder="stringsStore.getString('entercohortdescription')"
          ></textarea>
          <div class="form-text">{{ stringsStore.getString('cohortdescription') }}</div>
        </div>
      </div>

      <div class="card-body">
        <h2 class="h5 mb-4">{{ stringsStore.getString('settings') }}</h2>
        
        <div class="mb-4">
          <div class="form-check">
            <input
              v-model="formData.visible"
              type="checkbox"
              class="form-check-input"
              id="visible"
            />
            <label class="form-check-label" for="visible">
              {{ stringsStore.getString('visible') }}
            </label>
          </div>
          <div class="form-text">{{ stringsStore.getString('makecohortvisible') }}</div>
        </div>
        
        <ThemeSelect v-if="appStore.isAllowCohortThemesEnabled()" v-model="formData.theme" />
        <ContextSelect v-model="formData.categorytype" />
      </div>

      <!-- Form Actions -->
      <div class="card-footer d-flex justify-content-end gap-2">
        <button
          type="button"
          @click="resetForm"
          class="btn btn-secondary"
          :disabled="submitting"
        >
          <i class="icon fa fa-undo"></i> {{ stringsStore.getString('reset') }}
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="submitting"
        >
          <i class="icon fa fa-plus"></i>
          {{ submitting ? stringsStore.getString('creating') : stringsStore.getString('createcohort') }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>