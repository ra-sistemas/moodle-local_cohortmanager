<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStringsStore } from '../../stores/strings';
import type { Cohort, CohortEnrolInstance } from '../../types/interfaces';
import { getCohortEnrolInstances } from '../../utils/moodle';
// import { add } from 'core/toast';
import Notification from 'core/notification';

// Initialize strings store
const stringsStore = useStringsStore();

const enrolInstances = ref<CohortEnrolInstance[]>([]);
const loading = ref(false);

// Load enrol instances
const loadEnrolInstances = async () => {
  loading.value = true;
  try {
    const response = await getCohortEnrolInstances({
      cohortid: props.cohort.id
    });
    enrolInstances.value = response || [];
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Handle refresh
const handleRefresh = () => {
  loadEnrolInstances();
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
      <span class="badge bg-primary">{{ enrolInstances.length }} {{ stringsStore.getString('instancescount') }}</span>
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
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="card-title mb-0">{{ stringsStore.getString('enrolinstanceslist') }}</h6>
            <button @click="handleRefresh" class="btn btn-sm btn-outline-secondary">
              <i class="fa fa-refresh"></i> {{ stringsStore.getString('refresh') }}
            </button>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>{{ stringsStore.getString('course') }}</th>
                  <th>{{ stringsStore.getString('enrolmethod') }}</th>
                  <th>{{ stringsStore.getString('status') }}</th>
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
                    <span class="badge bg-info">
                      <i class="fa fa-users"></i> {{ stringsStore.getString('cohortenrol') }}
                    </span>
                  </td>
                  <td>
                    <span :class="['badge', instance.status ? 'bg-success' : 'bg-secondary']">
                      {{ instance.status ? stringsStore.getString('active') : stringsStore.getString('inactive') }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group">
                      <button class="btn btn-outline-primary" :title="stringsStore.getString('view')">
                        <i class="fa fa-eye"></i>
                      </button>
                      <button class="btn btn-outline-secondary" :title="stringsStore.getString('edit')">
                        <i class="fa fa-edit"></i>
                      </button>
                      <button class="btn btn-outline-danger" :title="stringsStore.getString('delete')">
                        <i class="fa fa-trash"></i>
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