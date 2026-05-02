<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCohorts } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import { add } from 'core/toast';
import CohortDetailsPartial from './partials/CohortDetailsPartial.vue';
import CohortMembersPartial from './partials/CohortMembersPartial.vue';
import CohortEnrolInstancesPartial from './partials/CohortEnrolInstancesPartial.vue';
import CohortRoleAssignmentsPartial from './partials/CohortRoleAssignmentsPartial.vue';
import type { Cohort } from '../types/interfaces';
import Notification from 'core/notification';

// Initialize strings store
const stringsStore = useStringsStore();

// Props
const props = defineProps<{
  id: number;
}>();

// State management
const router = useRouter();
const cohort = ref<Cohort | null>(null);

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

// Navigate back to list
const goBack = () => {
  router.push('/');
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
      <div class="d-flex justify-content-start mb-4">
        <button @click="goBack" class="btn btn-secondary"
          :title="stringsStore.getString('backtolist')">
          <i class="fa fa-arrow-left"></i> {{ stringsStore.getString('backtolist') }}
        </button>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button :class="['nav-link', { active: activeTab === 'details' }]" @click="activeTab = 'details'"
            :title="stringsStore.getString('details')">
            {{ stringsStore.getString('details') }}
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link', { active: activeTab === 'members' }]" @click="activeTab = 'members'"
            :title="stringsStore.getString('members')">
            {{ stringsStore.getString('members') }}
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link', { active: activeTab === 'enrolinstances' }]" @click="activeTab = 'enrolinstances'"
            :title="stringsStore.getString('enrolinstances')">
            {{ stringsStore.getString('enrolinstances') }}
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link', { active: activeTab === 'cohortroles' }]" @click="activeTab = 'cohortroles'"
            :title="stringsStore.getString('cohortroles')">
            {{ stringsStore.getString('cohortroles') }}
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content mb-2">
        <!-- Details Tab -->
        <CohortDetailsPartial 
          v-if="activeTab === 'details'" 
          :cohort="cohort" 
          :id="props.id"
          @delete-success="goBack"
        />
        
        <!-- Members Tab -->
        <CohortMembersPartial v-if="activeTab === 'members'" :cohort="cohort" />
        
        <!-- Enrol Instances Tab -->
        <CohortEnrolInstancesPartial v-if="activeTab === 'enrolinstances'" :cohort="cohort" />

        <!-- Cohort Roles Tab -->
        <CohortRoleAssignmentsPartial v-if="activeTab === 'cohortroles'" :cohort="cohort" />
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-4">
      <i class="fa fa-exclamation-triangle fa-3x text-warning mb-3"></i>
      <h3>{{ stringsStore.getString('cohortnotfound') }}</h3>
      <p class="text-muted">{{ stringsStore.getString('cohortnotfounddetails') }}</p>
      <button @click="goBack" class="btn btn-primary"
        :title="stringsStore.getString('backtocohortlist')">
        {{ stringsStore.getString('backtocohortlist') }}
      </button>
    </div>
  </div>
</template>
