<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStringsStore } from '../stores/strings';
import { getCohortCustomfieldForm } from '../utils/moodle';
import Templates from 'core/templates';
import Notification from 'core/notification';
interface CustomField {
  shortname: string;
  name: string;
  type: string;
  value: string;
  valueraw: string;
}

const props = defineProps<{
  cohortid: number;
}>();

const emit = defineEmits<{
  'update:customFields': [value: CustomField[]];
}>();

const stringsStore = useStringsStore();

// Reactive references
const formHtml = ref<string>('');
const isLoading = ref<boolean>(false);

// Load custom field form
const loadCustomFieldForm = async () => {
  if (!props.cohortid) return;
  
  try {
    isLoading.value = true;
    const template = await getCohortCustomfieldForm(props.cohortid);
    formHtml.value = template.html;
    Templates.runTemplateJS(template.js);
  } catch (error) {
    Notification.exception(error);
  } finally {
    isLoading.value = false;
  }
};

// Extract field data from the rendered form
// const extractFieldData = () => {
//   // This will need to be implemented based on the actual HTML structure
//   // For now, we'll emit an empty array to maintain compatibility
//   emit('update:customFields', []);
// };

// Load form on component mount
onMounted(() => {
  if (props.cohortid) {
    loadCustomFieldForm();
  }
});
</script>

<template>
  <div v-if="formHtml" class="border-top pt-3">
    <h2 class="h4">{{ stringsStore.getString('customfields') }}</h2>
    
    <div v-if="isLoading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div
      v-else
      v-html="formHtml"
      class="custom-field-form"
    ></div>
  </div>
</template>