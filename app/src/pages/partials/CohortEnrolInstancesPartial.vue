<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStringsStore } from '../../stores/strings';
import type { Cohort, CohortEnrolInstance } from '../../types/interfaces';
import { getCohortEnrolInstances, countCohortEnrolInstances } from '../../utils/moodle';
// import { add } from 'core/toast';
import Notification from 'core/notification';
import CohortEnrolInstancesAddModal from '../../components/CohortEnrolInstancesAddModal.vue';

// Initialize strings store
const stringsStore = useStringsStore();

const enrolInstances = ref<CohortEnrolInstance[]>([]);
const enrolInstancesCount = ref(0);
const loading = ref(false);

// Load enrol instances
const loadEnrolInstances = async () => {
  loading.value = true;
  try {
    const [instancesResponse, countResponse] = await Promise.all([
      getCohortEnrolInstances({
        cohortid: props.cohort.id
      }),
      countCohortEnrolInstances(props.cohort.id)
    ]);
    enrolInstances.value = instancesResponse || [];
    enrolInstancesCount.value = countResponse || 0;
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Handle added enrol instances event
const handleAddedEnrolInstances = (result: boolean) => {
  if (result) {
    loadEnrolInstances();
  }
};

// Initialize the component
onMounted(() => {
  loadEnrolInstances();
});

// Props
let props = defineProps<{
  cohort: Cohort;
}>();
</script>

<template>
  <div class="tab-pane fade show active">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{ stringsStore.getString('cohortenrolinstances') }}</h5>
      <span class="badge bg-primary">{{ enrolInstancesCount }} {{ stringsStore.getString('instancescount') }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <CohortEnrolInstancesAddModal :cohortid="cohort.id" @added:enrolinstances="handleAddedEnrolInstances" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <i class="fa fa-spinner fa-spin"></i> {{ stringsStore.getString('loadingenrolinstances') }}
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="enrolInstances.length === 0" class="text-center py-4">
        <i class="fa fa-link fa-3x text-muted mb-3"></i>
        <h5>{{ stringsStore.getString('noenrolinstancesfound') }}</h5>
        <p class="text-muted">{{ stringsStore.getString('noenrolinstancesfounddescription') }}</p>
      </div>

      <!-- Enrol Instances List -->
      <div v-else class="card">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>{{ stringsStore.getString('course') }}</th>
                  <th>{{ stringsStore.getString('role') }}</th>
                  <th>{{ stringsStore.getString('enroled') }}</th>
                  <th>{{ stringsStore.getString('group') }}</th>
                  <th>{{ stringsStore.getString('groupmembers') }}</th>
                  <th>{{ stringsStore.getString('actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="instance in enrolInstances" :key="instance.id">
                  <td>
                    <div>
                      <strong>{{ instance.coursefullname || instance.courseshortname }}</strong>
                      <br>
                      <small class="text-muted">{{ instance.courseshortname }}</small>
                    </div>
                  </td>
                  <td>
                    <span>
                      {{ instance.rolename }}
                    </span>
                  </td>
                  <td>
                    {{ instance.enroled }}
                  </td>
                  <td>
                    {{ instance.groupname }}
                  </td>
                  <td>
                    {{ instance.groupmembers }}
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group">
                      <button class="btn" :class="instance.status ? 'btn-outline-primary' : 'btn-primary'"
                        :title="stringsStore.getString('view')">
                        <i class="fa " :class="instance.status ? 'fa-eye' : 'fa-eye-slash'"></i>
                      </button>
                      <button class="btn btn-outline-secondary" :title="stringsStore.getString('edit')">
                        <i class="fa fa-edit"></i>
                      </button>
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