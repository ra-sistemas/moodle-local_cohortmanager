<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Notification from 'core/notification';
import { getCustomfieldlist } from '@/utils/moodle';
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
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Initialize the component
onMounted(() => {
  loadCustomFields();
});
</script>

<template>
  <div id="cohort-customfield-manager">
    <div id="cohort-customfield-manager-html" v-html="template.html"></div>
    <div id="cohort-customfield-manager-js" v-html="template.js"></div>
  </div>
</template>

<style scoped>
</style>