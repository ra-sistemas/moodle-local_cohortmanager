<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
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
  customfields: CustomField[]
}>();

const emit = defineEmits<{
  'update:customFields': [value: CustomField[]];
}>();

const stringsStore = useStringsStore();

// Reactive references
const formHtml = ref<string>('');
const isLoading = ref<boolean>(false);
const formContainer = ref<HTMLElement | null>(null);

// Load custom field form
const loadCustomFieldForm = async () => {
  if (!props.cohortid) return;

  try {
    isLoading.value = true;
    const template = await getCohortCustomfieldForm(props.cohortid);
    formHtml.value = template.html;
    await nextTick();
    Templates.runTemplateJS(template.js);
    await nextTick();
    formContainer.value = document.querySelector('#custom-field-form form');
    setupFormListeners();
  } catch (error) {
    Notification.exception(error);
  } finally {
    isLoading.value = false;
  }
};

// Extract field data from the rendered form
const extractFieldData = (): CustomField[] => {
  const fields: CustomField[] = [];

  if (!formContainer.value) return fields;

  // Find all form elements with customfield_ prefix
  const formElements = formContainer.value.querySelectorAll('input, select, textarea');

  formElements.forEach(element => {
    const inputElement = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const name = inputElement.name;

    if (name && name.startsWith('customfield_')) {
      // Extract shortname from the name (remove customfield_ prefix)
      const shortname = name.replace('customfield_', '').split('[')[0];

      // Find the corresponding field definition
      const fieldDef = props.customfields.find(field => field.shortname === shortname);
      if (!fieldDef) return;

      let value = '';

      // Handle different input types
      if (inputElement.type === 'checkbox') {
        value = (inputElement as HTMLInputElement).checked ? '1' : '0';
      } else if (inputElement.tagName === 'SELECT') {
        const selectElement = inputElement as HTMLSelectElement;
        value = selectElement.value;
      } else {
        value = inputElement.value;
      }

      // Handle complex fields like date selectors
      if (name.includes('[')) {
        const fieldParts = name.split('[');
        const fieldNameRaw = fieldParts[0];
        const fieldName = fieldNameRaw ? fieldNameRaw.replace('customfield_', ''): '';
        const subField = fieldParts[1]?.replace(']', '');

        if (!fieldName || !subField) return;

        // Find if we already have this field
        let existingField = fields.find(f => f.shortname === fieldName);
        if (!existingField) {
          existingField = {
            shortname: fieldName,
            name: fieldDef.name,
            type: fieldDef.type,
            value: '',
            valueraw: ''
          };
          fields.push(existingField);
        }

        if (document.querySelector(`[data-groupname="${fieldNameRaw}"] fieldset[data-fieldtype="date"]`)) {
          if (!formContainer.value) return;

          const enabledCheckbox = formContainer.value.querySelector(`input[name="${fieldNameRaw}[enabled]"]`) as HTMLInputElement;
          if (enabledCheckbox && enabledCheckbox.checked) {
            const daySelect = formContainer.value.querySelector(`select[name="${fieldNameRaw}[day]"]`) as HTMLSelectElement;
            const monthSelect = formContainer.value.querySelector(`select[name="${fieldNameRaw}[month]"]`) as HTMLSelectElement;
            const yearSelect = formContainer.value.querySelector(`select[name="${fieldNameRaw}[year]"]`) as HTMLSelectElement;

            if (daySelect && monthSelect && yearSelect) {
              const day = daySelect.value;
              const month = monthSelect.value;
              const year = yearSelect.value;
              const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
              existingField.valueraw = Math.floor(date.getTime() / 1000).toString();
              existingField.value = date.toLocaleDateString();
            }
          }
          else {
            existingField.valueraw = '0';
            existingField.value = '0';
          }
        }
      } else {
        // Simple field
        fields.push({
          shortname: shortname || '',
          name: fieldDef.name,
          type: fieldDef.type,
          value: value,
          valueraw: value
        });
      }
    }
  });

  return fields;
};

// Setup event listeners for form changes
const setupFormListeners = () => {

  if (!formContainer.value) return;

  // Remove existing listeners to avoid duplicates
  const formElements = formContainer.value.querySelectorAll('input, select, textarea');
  formElements.forEach(element => {
    element.removeEventListener('change', handleFormChange);
    element.removeEventListener('input', handleFormChange);
    element.addEventListener('change', handleFormChange);
    element.addEventListener('input', handleFormChange);
  });
};

// Handle form changes
const handleFormChange = () => {
  const updatedFields = extractFieldData();
  emit('update:customFields', updatedFields);
};

// Load form on component mount
onMounted(() => {
  if (props.cohortid) {
    loadCustomFieldForm();
  }
});

// Watch for formHtml changes to re-setup listeners
watch(() => formHtml.value, () => {
  if (formHtml.value) {
    nextTick(() => {
      setupFormListeners();
    });
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

    <div v-html="formHtml" id="custom-field-form"></div>
  </div>
</template>