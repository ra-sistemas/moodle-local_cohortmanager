<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCohorts, updateCohorts } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import { add } from 'core/toast';
import type { Cohort } from '../types/moodle-api';
import ThemeSelect from '../components/ThemeSelect.vue';

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
      add(stringsStore.getString('cohortnotfound'), 'warning');
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : stringsStore.getString('failedtoloadcohortdata');
    add(errorMessage, 'error');
  } finally {
    loading.value = false;
  }
};

// Submit form
const submitForm = async () => {
  if (!formData.value.name.trim()) {
    add('Please enter a cohort name', 'warning');
    return;
  }

  if (!formData.value.idnumber.trim()) {
    add('Please enter an ID number', 'warning');
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
    add(stringsStore.getString('cohortupdatedsuccessfully'), 'success');
    router.push(`/local/cohortmanager/cohort/${props.id}`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : stringsStore.getString('failedtoupdatecohort');
    add(errorMessage, 'error');
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
  <div class="container">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <i class="icon fa fa-spinner fa-spin"></i> {{ stringsStore.getString('loadingcohortdata') }}
    </div>

    <!-- Form -->
    <div v-else-if="cohort" class="card">
      <!-- Header -->
      <div class="card-header d-flex justify-content-between align-items-center">
        <h1 class="h3 mb-0">{{ stringsStore.getString('editcohort') }}</h1>
        <div>
          <button @click="goBack" class="btn btn-secondary">
            <i class="icon fa fa-times"></i> {{ stringsStore.getString('cancel') }}
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="submitForm" class="card-body">
        <div class="form-section">
          <h2 class="h4">{{ stringsStore.getString('basicinformation') }}</h2>
          
          <div class="mb-3">
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
          
          <div class="mb-3">
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
          
          <div class="mb-3">
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

        <div class="border-top pt-3">
          <h2 class="h4">{{ stringsStore.getString('settings') }}</h2>
          
          <div class="mb-3">
            <div class="form-check">
              <input
                v-model="formData.visible"
                type="checkbox"
                class="form-check-input"
                id="visible"
              />
              <label class="form-check-label" for="visible">{{ stringsStore.getString('visible') }}</label>
            </div>
            <div class="form-text">{{ stringsStore.getString('makecohortvisible') }}</div>
          </div>
          
          <ThemeSelect v-model="formData.theme" />
        </div>

        <!-- Custom Fields Section -->
        <div v-if="cohort.customfields && cohort.customfields.length > 0" class="border-top pt-3">
          <h2 class="h4">{{ stringsStore.getString('customfields') }}</h2>
          
          <div
            v-for="field in cohort.customfields"
            :key="field.shortname"
            class="mb-3"
          >
            <label :for="`custom-${field.shortname}`" class="form-label">{{ field.name }}</label>
            <input
              :id="`custom-${field.shortname}`"
              v-model="field.value"
              :type="field.type === 'text' ? 'text' : 'text'"
              class="form-control"
              :placeholder="`Enter ${field.name}`"
            />
            <div class="form-text">{{ field.name }}</div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="card-footer d-flex justify-content-end gap-2">
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
    <div v-else class="text-center py-4">
      <i class="icon fa fa-exclamation-triangle text-warning" style="font-size: 48px;"></i>
      <h3 class="mt-3">{{ stringsStore.getString('cohortnotfound') }}</h3>
      <p>{{ stringsStore.getString('cohortnotfound') + ' data.' }}</p>
      <button @click="goBack" class="btn btn-primary">
        {{ stringsStore.getString('backtocohortlist') }}
      </button>
    </div>
  </div>
</template>
