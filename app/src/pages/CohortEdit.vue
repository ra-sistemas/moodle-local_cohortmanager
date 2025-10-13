<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCohorts, updateCohorts, getCohortContextInfo } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import { useAppStore } from '../stores/app';
import { add } from 'core/toast';
import type { Cohort } from '../types/moodle-api';
import ThemeSelect from '../components/ThemeSelect.vue';
import ContextSelect from '../components/ContextSelect.vue';
import CohortNameInput from '../components/CohortNameInput.vue';
import CohortIdNumberInput from '../components/CohortIdNumberInput.vue';
import CohortDescriptionInput from '../components/CohortDescriptionInput.vue';
import CohortVisibleInput from '../components/CohortVisibleInput.vue';
import CohortCustomFields from '../components/CohortCustomFields.vue';
import Notification from 'core/notification';

// Initialize stores
const stringsStore = useStringsStore();
const appStore = useAppStore();

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
  contextinfo: {
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

      let contextInfo = {
        type: 'system',
        value: ''
      };
      try {
        contextInfo = await getCohortContextInfo({
          cohortid: props.id
        });
      } catch (contextErr) {
        console.warn('Failed to fetch cohort context info, using defaults:', contextErr);
      }

      // Populate form data
      formData.value = {
        name: cohort.value!.name,
        idnumber: cohort.value!.idnumber,
        description: cohort.value!.description,
        visible: cohort.value!.visible,
        theme: cohort.value!.theme || '',
        contextinfo: contextInfo
      };
    } else {
      add(stringsStore.getString('cohortnotfound'), 'warning');
    }
  } catch (err) {
    Notification.exception(err);
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
      categorytype: formData.value.contextinfo,
      name: formData.value.name,
      idnumber: formData.value.idnumber,
      description: formData.value.description,
      descriptionformat: 1,
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
    router.push(`/cohort/${props.id}`);
  } catch (err) {
    Notification.exception(err);
  } finally {
    submitting.value = false;
  }
};

// Navigate back
const goBack = () => {
  router.push(`/cohort/${props.id}`);
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
      <i class="fa fa-spinner fa-spin"></i> {{ stringsStore.getString('loadingcohortdata') }}
    </div>

    <!-- Form -->
    <div v-else-if="cohort" class="card">
      <!-- Header -->
      <div class="card-header d-flex justify-content-between align-items-center">
        <h1 class="h3 mb-0">{{ stringsStore.getString('editcohort') }}</h1>
        <div>
          <button @click="goBack" class="btn btn-secondary">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="submitForm" class="card-body">
        <div class="form-section">
          <h2 class="h4">{{ stringsStore.getString('basicinformation') }}</h2>

          <CohortNameInput v-model="formData.name" />
          <CohortIdNumberInput v-model="formData.idnumber" />
          <CohortDescriptionInput v-model="formData.description" />
        </div>

        <div class="border-top pt-3">
          <h2 class="h4">{{ stringsStore.getString('settings') }}</h2>

          <CohortVisibleInput v-model="formData.visible" />
          <ThemeSelect v-if="appStore.isAllowCohortThemesEnabled()" v-model="formData.theme" />
          <ContextSelect v-model="formData.contextinfo" />
        </div>

        <!-- Custom Fields Section -->
        <CohortCustomFields
          v-if="cohort && cohort.customfields && cohort.customfields.length > 0"
          :custom-fields="cohort!.customfields"
          @update:custom-fields="(updatedFields) => cohort!.customfields = updatedFields"
        />

        <!-- Form Actions -->
        <div class="card-footer d-flex justify-content-end gap-2">
          <button type="button" @click="goBack" class="btn btn-secondary" :disabled="submitting">
            {{ stringsStore.getString('cancel') }}
          </button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            <i class="fa fa-save"></i>
            {{ submitting ? stringsStore.getString('saving') : stringsStore.getString('savechanges') }}
          </button>
        </div>
      </form>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-4">
      <i class="fa fa-exclamation-triangle text-warning" style="font-size: 48px;"></i>
      <h3 class="mt-3">{{ stringsStore.getString('cohortnotfound') }}</h3>
      <p>{{ stringsStore.getString('cohortnotfound') + ' data.' }}</p>
      <button @click="goBack" class="btn btn-primary">
        {{ stringsStore.getString('backtocohortlist') }}
      </button>
    </div>
  </div>
</template>
