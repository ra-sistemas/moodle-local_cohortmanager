<script setup lang="ts">
import { onMounted } from 'vue';
import { loadAllStrings } from './utils/moodle';

// Preload all strings when the component is creatred
onMounted(async () => {
  try {
    await loadAllStrings();
  } catch (error) {
    console.warn('Failed to preload some strings:', error);
  }
});
</script>

<template>
  <div class="container-fluid">
    <!-- Router view to render current route component -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
/* Fade transition for router view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
