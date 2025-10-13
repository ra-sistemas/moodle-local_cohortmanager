<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStringsStore } from '../stores/strings';
import { useTinyMceEditor } from '../utils/tinyMceEditor';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const stringsStore = useStringsStore();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// Use the TinyMCE editor composable
const {
  editorInitialized,
  initEditor,
  setContent,
  getContent,
  removeEditor
} = useTinyMceEditor('description');

// Update editor content when modelValue changes
const updateEditorContent = () => {
  if (!editorInitialized.value) return;
  setContent(props.modelValue);
};

// Handle editor content changes
const handleEditorChange = () => {
  if (!editorInitialized.value) return;
  const content = getContent();
  emit('update:modelValue', content);
};

// Watch for modelValue changes
watch(() => props.modelValue, () => {
  updateEditorContent();
}, { deep: true });

// Initialize editor when component is mounted
onMounted(() => {
  initEditor();
});

// Cleanup when component is unmounted
onBeforeUnmount(() => {
  removeEditor();
});
</script>

<template>
  <div class="mb-3">
    <label for="description" class="form-label">{{ stringsStore.getString('description') }}</label>
    <textarea
      ref="textareaRef"
      id="description"
      :value="modelValue"
      @input="handleEditorChange"
      class="form-control"
      rows="4"
      :placeholder="stringsStore.getString('entercohortdescription')"
    ></textarea>
    <div class="form-text">{{ stringsStore.getString('cohortdescription') }}</div>
  </div>
</template>