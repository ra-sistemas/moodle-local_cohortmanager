<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStringsStore } from '../stores/strings';

// Type declaration for Moodle's require function
declare global {
  interface Window {
    require: (modules: string[], callback: (...args: any[]) => void, error?: (error: any) => void) => void;
  }
}

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const stringsStore = useStringsStore();
const editorInitialized = ref(false);

// Reference to the textarea element
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// Initialize TinyMCE editor
const initEditor = async () => {
  if (!textareaRef.value || editorInitialized.value) return;
  
  try {
    // Use Moodle's AMD require to load the editor_tiny/editor module
    await new Promise<void>((resolve, reject) => {
      // @ts-ignore - Moodle's global require function
      require(['editor_tiny/editor'], (editor: any) => {
        editor.setupForElementId({
          elementId: 'description',
          options: {
            context: 0, // Default context
            draftitemid: 0, // No draft item
            filepicker: {}, // No file picker
            language: {}, // Default language
            currentLanguage: 'en',
            branding: true,
            css: [], // No custom CSS
            extended_valid_elements: '', // No extended valid elements
            plugins: {} // No additional plugins
          }
        });
        editorInitialized.value = true;
        resolve();
      }, (error: any) => {
        console.error('Failed to load editor_tiny/editor module:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('Failed to initialize TinyMCE editor:', error);
  }
};

// Update editor content when modelValue changes
const updateEditorContent = () => {
  if (!textareaRef.value || !editorInitialized.value) return;
  
  const editor = (window as any).tinyMCE?.get('description');
  if (editor) {
    editor.setContent(props.modelValue);
  }
};

// Handle editor content changes
const handleEditorChange = () => {
  if (!textareaRef.value || !editorInitialized.value) return;
  
  const editor = (window as any).tinyMCE?.get('description');
  if (editor) {
    const content = editor.getContent();
    emit('update:modelValue', content);
  }
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
  if (textareaRef.value && editorInitialized.value) {
    const editor = (window as any).tinyMCE?.get('description');
    if (editor) {
      editor.remove();
      editorInitialized.value = false;
    }
  }
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