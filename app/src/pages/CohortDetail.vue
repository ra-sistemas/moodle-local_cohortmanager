<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCohorts, getCohortMembers } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import { add } from 'core/toast';
import CohortDelete from '../components/CohortDelete.vue';
import CohortDetailsPartial from './partials/CohortDetailsPartial.vue';
import CohortMembersPartial from './partials/CohortMembersPartial.vue';
import type { Cohort } from '../types/interfaces';
import Notification from 'core/notification';

// Initialize strings store
const stringsStore = useStringsStore();

interface CohortMember {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

// Props
const props = defineProps<{
  id: number;
}>();

// State management
const router = useRouter();
const cohort = ref<Cohort | null>(null);
const members = ref<CohortMember[]>([]);
const loading = ref(false);
const activeTab = ref('details');

// Load cohort details
const loadCohort = async () => {
  loading.value = true;

  try {
    const cohortsList = await getCohorts({
      cohortids: [props.id]
    });

    if (cohortsList && cohortsList.length > 0) {
      cohort.value = cohortsList[0];
      await loadMembers();
    } else {
      add(stringsStore.getString('cohortnotfound'), {
        type: 'danger'
      });
    }
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Load cohort members
const loadMembers = async () => {
  try {
    const membersResponse = await getCohortMembers({
      cohortids: [props.id]
    });
    members.value = membersResponse || [];
  } catch (err) {
    Notification.exception(err);
  }
};

// Navigate back to list
const goBack = () => {
  router.push('/');
};

// Edit cohort
const editCohort = () => {
  router.push(`/cohort/${props.id}/edit`);
};

// Handle cohort deletion success
const handleDeleteSuccess = () => {
  goBack();
};

// Initialize the component
onMounted(() => {
  loadCohort();
});
</script>

<template>
  <div class="container">

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <i class="fa fa-spinner fa-spin"></i> {{ stringsStore.getString('loadingcohortdetails') }}
    </div>

    <!-- Content -->
    <div v-else-if="cohort" class="mt-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex gap-2">
          <button @click="goBack" class="btn btn-secondary">
            <i class="fa fa-arrow-left"></i> {{ stringsStore.getString('backtolist') }}
          </button>
          <button @click="editCohort" class="btn btn-primary">
            <i class="fa fa-edit"></i> {{ stringsStore.getString('edit') }}
          </button>
          <CohortDelete :cohort="cohort" @success="handleDeleteSuccess" />
        </div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button :class="['nav-link', { active: activeTab === 'details' }]" @click="activeTab = 'details'">
            {{ stringsStore.getString('details') }}
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link', { active: activeTab === 'members' }]" @click="activeTab = 'members'">
            {{ stringsStore.getString('members') }} ({{ members.length }})
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Details Tab -->
        <CohortDetailsPartial v-if="activeTab === 'details'" :cohort="cohort" />
        
        <!-- Members Tab -->
        <CohortMembersPartial v-if="activeTab === 'members'" :members="members" :cohort="cohort" />
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-4">
      <i class="fa fa-exclamation-triangle fa-3x text-warning mb-3"></i>
      <h3>{{ stringsStore.getString('cohortnotfound') }}</h3>
      <p class="text-muted">{{ stringsStore.getString('cohortnotfounddetails') }}</p>
      <button @click="goBack" class="btn btn-primary">
        {{ stringsStore.getString('backtocohortlist') }}
      </button>
    </div>
  </div>
</template>
