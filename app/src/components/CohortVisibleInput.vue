<script setup lang="ts">
import { useStringsStore } from '../stores/strings';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const stringsStore = useStringsStore();

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<template>
  <div class="mb-3">
    <div class="form-check">
      <input 
        :checked="modelValue" 
        @change="updateValue"
        type="checkbox" 
        class="form-check-input" 
        id="visible" 
      />
      <label class="form-check-label" for="visible">{{ stringsStore.getString('visible') }}</label>
    </div>
    <div class="form-text">{{ stringsStore.getString('makecohortvisible') }}</div>
  </div>
</template>