<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStringsStore } from '../../stores/strings';
import type { Cohort } from '../../types/interfaces';
import CohortMembersAddModal from '../../components/CohortMembersAddModal.vue';
import { getCohortMembers } from '../../utils/moodle';

// Initialize strings store
const stringsStore = useStringsStore();

const members = ref<CohortMember[]>([]);

interface CohortMember {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

// Load members
const loadMembers = async () => {
  try {
    members.value = await getCohortMembers({
      cohortids: [props.cohort.id]
    });
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

// Initialize the component
onMounted(() => {
  loadMembers();
});

// Props
const props = defineProps<{
  cohort: Cohort;
}>();

</script>

<template>
  <div class="tab-pane fade show active">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{ stringsStore.getString('cohortmembers') }}</h5>
      <span class="badge bg-primary">{{ members.length }} {{ stringsStore.getString('memberscount') }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <CohortMembersAddModal :cohortid="cohort.id" @added:members="handleAddedMembers" />
    </div>

    <div v-if="members.length > 0" class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>{{ stringsStore.getString('name') }}</th>
            <th>{{ stringsStore.getString('username') }}</th>
            <th>{{ stringsStore.getString('email') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td class="fw-medium">{{ member.firstname }} {{ member.lastname }}</td>
            <td>{{ member.username }}</td>
            <td>{{ member.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-4">
      <i class="fa fa-users fa-3x text-muted mb-3"></i>
      <p class="text-muted">{{ stringsStore.getString('nomembersfound') }}</p>
    </div>
  </div>
</template>