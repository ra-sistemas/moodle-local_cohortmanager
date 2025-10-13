<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Templates from 'core/templates';
import Notification from 'core/notification';
import { useRouter } from 'vue-router';
import { getCustomfieldlist } from '@/utils/moodle';
import { useStringsStore } from '../stores/strings';

const stringsStore = useStringsStore();
const router = useRouter();

// State management
const loading = ref(false);
const template = ref({
  html: '',
  js: ''
});

// Load custom fields
const loadCustomFields = async () => {
  loading.value = true;

  try {
    template.value = await getCustomfieldlist();
    // Wait for DOM to update with HTML content
    await nextTick();
    // Execute JavaScript after HTML is rendered
    if (template.value.js) {
      Templates.runTemplateJS(template.value.js);
    }
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Navigate back to home
const goBack = () => {
  router.push('/');
};

// Initialize the component
onMounted(() => {
  loadCustomFields();
});
</script>

<template>
  <div id="cohort-customfield-manager">
    <button @click="goBack" class="btn btn-secondary" aria-label="{{ stringsStore.getString('backhome') }}">
      <i class="fa fa-chevron-left"></i>
      {{ stringsStore.getString('back') }}
    </button>
    <div id="cohort-customfield-manager-html" v-html="template.html"></div>
  </div>
</template>

<style scoped>
</style>