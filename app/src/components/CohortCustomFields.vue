<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStringsStore } from '../stores/strings';

interface CustomField {
  shortname: string;
  name: string;
  type: string;
  value: string;
  valueraw: string;
}

const props = defineProps<{
  customFields: CustomField[];
}>();

const emit = defineEmits<{
  'update:customFields': [value: CustomField[]];
}>();

const stringsStore = useStringsStore();

// Reactive reference for custom fields
const localCustomFields = ref<CustomField[]>(props.customFields);

const updateFieldValue = (fieldShortname: string, newValue: string) => {
  const updatedFields = localCustomFields.value.map(field =>
    field.shortname === fieldShortname
      ? { ...field, value: newValue }
      : field
  );
  emit('update:customFields', updatedFields);
};

// Watch for changes from parent
watch(() => props.customFields, (newFields: CustomField[]) => {
  localCustomFields.value = newFields;
}, { deep: true });
</script>

<template>
  <div v-if="customFields && customFields.length > 0" class="border-top pt-3">
    <h2 class="h4">{{ stringsStore.getString('customfields') }}</h2>

    <div v-for="field in customFields" :key="field.shortname" class="mb-3">
      <label :for="`custom-${field.shortname}`" class="form-label">{{ field.name }}</label>
      <input 
        :id="`custom-${field.shortname}`" 
        :value="field.value"
        @input="(e) => updateFieldValue(field.shortname, (e.target as HTMLInputElement).value)"
        :type="field.type === 'text' ? 'text' : 'text'" 
        class="form-control"
        :placeholder="`Enter ${field.name}`" 
      />
      <div class="form-text">{{ field.name }}</div>
    </div>
  </div>
</template>