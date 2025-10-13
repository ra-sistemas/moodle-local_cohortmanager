<script setup lang="ts">
import { useStringsStore } from '../stores/strings';

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const stringsStore = useStringsStore();

const updateValue = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="mb-3">
    <label for="description" class="form-label">{{ stringsStore.getString('description') }}</label>
    <textarea 
      id="description" 
      :value="modelValue" 
      @input="updateValue"
      class="form-control" 
      rows="4"
      :placeholder="stringsStore.getString('entercohortdescription')"
    ></textarea>
    <div class="form-text">{{ stringsStore.getString('cohortdescription') }}</div>
  </div>
</template>