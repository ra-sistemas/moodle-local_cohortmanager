<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStringsStore } from '../../stores/strings';
import type { Cohort, CohortRoleAssignment } from '../../types/interfaces';
import { listCohortRoleAssignments } from '../../utils/moodle';
import Notification from 'core/notification';
import CohortRoleAssignmentAddModal from '../../components/CohortRoleAssignmentAddModal.vue';
import CohortRoleAssignmentDelete from '../../components/CohortRoleAssignmentDelete.vue';

const stringsStore = useStringsStore();

const assignments = ref<CohortRoleAssignment[]>([]);
const assignmentsCount = ref(0);
const loading = ref(false);
const lastSyncTime = ref(0);
const nextSyncTime = ref(0);

const loadAssignments = async () => {
  loading.value = true;
  try {
    const response = await listCohortRoleAssignments({
      cohortid: props.cohort.id
    });
    assignments.value = response?.assignments || [];
    assignmentsCount.value = response?.total || 0;
    lastSyncTime.value = response?.lastruntime || 0;
    nextSyncTime.value = response?.nextruntime || 0;
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

const handleAddedAssignment = (result: boolean) => {
  if (result) {
    loadAssignments();
  }
};

const handleDeletedAssignment = () => {
  loadAssignments();
};

const formatDate = (timestamp: number) => {
  if (!timestamp) return stringsStore.getString('syncnever');
  return new Date(timestamp * 1000).toLocaleString();
};

onMounted(() => {
  loadAssignments();
});

let props = defineProps<{
  cohort: Cohort;
}>();
</script>

<template>
  <div class="tab-pane fade show active">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{ stringsStore.getString('cohortroleassignments') }}</h5>
      <span class="badge bg-primary my-2 p-2"><i class="fa fa-sitemap me-1"></i>{{ assignmentsCount }} {{ stringsStore.getString('cohortroleassignmentscount') }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <CohortRoleAssignmentAddModal :cohortid="cohort.id" @added:assignment="handleAddedAssignment" />
    </div>

    <div class="small mb-3">
      <span class="text-muted">{{ stringsStore.getString('synclastsync') }}:</span> {{ formatDate(lastSyncTime) }}
      &nbsp;&middot;&nbsp;
      <span class="text-muted">{{ stringsStore.getString('syncnextsync') }}:</span> {{ formatDate(nextSyncTime) }}
    </div>

    <div class="text-muted small mb-3">
      {{ stringsStore.getString('backgroundsyncnote') }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <i class="fa fa-spinner fa-spin"></i> {{ stringsStore.getString('loadingcohortroles') }}
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="assignments.length === 0" class="text-center py-4">
        <i class="fa fa-sitemap fa-3x text-muted mb-3"></i>
        <h5>{{ stringsStore.getString('noroughassignmentsfound') }}</h5>
        <p class="text-muted">{{ stringsStore.getString('noroughassignmentsfounddescription') }}</p>
      </div>

      <!-- Assignments List -->
      <div v-else class="card">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="table-light">
                <tr>
                  <th>{{ stringsStore.getString('assigneduser') }}</th>
                  <th>{{ stringsStore.getString('assignedrole') }}</th>
                  <th>{{ stringsStore.getString('assignedtime') }}</th>
                  <th>{{ stringsStore.getString('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="assignment in assignments" :key="assignment.id">
                  <td>
                    <div>
                      <strong>{{ assignment.userfullname }}</strong>
                      <br>
                      <small class="text-muted">{{ assignment.useremail }}</small>
                    </div>
                  </td>
                  <td>
                    {{ assignment.rolename }}
                  </td>
                  <td>
                    {{ formatDate(assignment.timecreated) }}
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group">
                      <CohortRoleAssignmentDelete :assignment="assignment" @deleted:assignment="handleDeletedAssignment" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
