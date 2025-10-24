<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStringsStore } from '../../stores/strings';
import type { Cohort } from '../../types/interfaces';
import CohortMembersAddModal from '../../components/CohortMembersAddModal.vue';
import DynamicCohortMembersTable from '../../components/DynamicCohortMembersTable.vue';

// Initialize strings store
const stringsStore = useStringsStore();

const totalMembers = ref(0);

// Load members
const loadMembers = async () => {
  try {
    // TODO: Must use a api key to load total members
    totalMembers.value = 12;
  } catch (err) {
    console.error('Error loading members:', err);
  }
};

// Handle added members event
const handleAddedMembers = (result: boolean) => {
  if (result) {
    loadMembers();
  }
};

// Handle refresh from dynamic table
const handleTableRefresh = () => {
  loadMembers();
};

// Initialize the component
onMounted(() => {
  loadMembers();
});

// Props
defineProps<{
  cohort: Cohort;
}>();

</script>

<template>
  <div class="tab-pane fade show active">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{ stringsStore.getString('cohortmembers') }}</h5>
      <span class="badge bg-primary">{{ totalMembers }} {{ stringsStore.getString('memberscount') }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <CohortMembersAddModal :cohortid="cohort.id" @added:members="handleAddedMembers" />
    </div>

    <!-- Dynamic table with all features -->
    <DynamicCohortMembersTable :cohortId="cohort.id" @refresh="handleTableRefresh" />
  </div>
</template>