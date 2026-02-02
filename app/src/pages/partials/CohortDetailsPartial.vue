<script setup lang="ts">
import { useStringsStore } from '../../stores/strings';
import type { Cohort } from '../../types/interfaces';

// Initialize strings store
const stringsStore = useStringsStore();

// Props
defineProps<{
  cohort: Cohort;
}>();
</script>

<template>
  <div class="tab-pane fade show active">
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="card-title mb-0">{{ stringsStore.getString('basicinformation') }}</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ stringsStore.getString('name') }}:</label>
            <p class="form-control-plaintext">{{ cohort.name }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ stringsStore.getString('idnumber') }}:</label>
            <p class="form-control-plaintext">{{ cohort.idnumber }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ stringsStore.getString('visibility') }}:</label>
            <span :class="['badge', cohort.visible ? 'bg-success' : 'bg-secondary']">
              {{ cohort.visible ? stringsStore.getString('visible') : stringsStore.getString('hidden') }}
            </span>
          </div>
          <div v-if="cohort.theme" class="col-md-6 mb-3">
            <label class="form-label">{{ stringsStore.getString('theme') }}:</label>
            <p class="form-control-plaintext">{{ cohort.theme }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        <h5 class="card-title mb-0">{{ stringsStore.getString('description') }}</h5>
      </div>
      <div class="card-body">
        <div v-if="cohort.description" v-html="cohort.description"></div>
        <div v-else class="text-muted fst-italic">
          {{ stringsStore.getString('nodescriptionprovided') }}
        </div>
      </div>
    </div>

    <div v-if="cohort.customfields && cohort.customfields.length > 0" class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">{{ stringsStore.getString('customfields') }}</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div v-for="field in cohort.customfields" :key="field.shortname" class="col-md-6 mb-3">
            <label class="form-label">{{ field.name }}:</label>
            <p class="form-control-plaintext">{{ field.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>