<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCohorts, getCohortMembers } from '../utils/moodle';
import { useStringsStore } from '../stores/strings';
import { add } from 'core/toast';
import CohortDelete from '../components/CohortDelete.vue';
import type { Cohort } from '../types/moodle-api';
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
        <div v-if="activeTab === 'details'" class="tab-pane fade show active">
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

        <!-- Members Tab -->
        <div v-if="activeTab === 'members'" class="tab-pane fade show active">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">{{ stringsStore.getString('cohortmembers') }}</h5>
            <span class="badge bg-primary">{{ members.length }} {{ stringsStore.getString('memberscount') }}</span>
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
