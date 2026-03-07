<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useStringsStore } from '../stores/strings';
import { getUserContextRoles, createRole, updateRole, deleteRole } from '../utils/moodle';
import Notification from 'core/notification';
import type { RoleFormData, Pagination } from '../types/interfaces';
import { useRouter } from 'vue-router';

const router = useRouter();

// Initialize strings store
const stringsStore = useStringsStore();

// State management
const roles = ref<RoleFormData[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const pagination = reactive<Pagination>({
  page: 1,
  perpage: 10,
  total: 0
});

// Modal state
const showModal = ref(false);
const modalMode = ref<'create' | 'edit'>('create');
const formData = reactive<RoleFormData>({
  id: 0,
  name: '',
  shortname: '',
  description: '',
  archetype: ''
});

// Archetype options
const archetypeOptions = [
  { value: '', label: 'None' },
  { value: 'user', label: 'User' },
  { value: 'manager', label: 'Manager' },
  { value: 'coursecreator', label: 'Course Creator' },
  { value: 'editingteacher', label: 'Editing Teacher' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
  { value: 'guest', label: 'Guest' },
  { value: 'frontpage', label: 'Frontpage' }
];

// Initialize the component
onMounted(async () => {
  await loadRoles();
});

// Load roles with pagination
const loadRoles = async () => {
  loading.value = true;

  try {
    const rolesResponse = await getUserContextRoles({
      query: searchQuery.value,
      page: (pagination.page - 1),
      perpage: pagination.perpage
    });
    roles.value = rolesResponse?.roles || [];
    pagination.total = rolesResponse?.total || 0;
  } catch (err) {
    Notification.exception(err);
  } finally {
    loading.value = false;
  }
};

// Search roles
const searchRoles = () => {
  pagination.page = 1;
  loadRoles();
};

// Pagination handlers
const goToPage = (page: number) => {
  pagination.page = page;
  loadRoles();
};

const prevPage = () => {
  if (pagination.page > 1) {
    goToPage(pagination.page - 1);
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(pagination.total / pagination.perpage);
  if (pagination.page < totalPages) {
    goToPage(pagination.page + 1);
  }
};

// Open create modal
const openCreateModal = () => {
  modalMode.value = 'create';
  formData.id = 0;
  formData.name = '';
  formData.shortname = '';
  formData.description = '';
  formData.archetype = '';
  showModal.value = true;
};

// Open edit modal
const openEditModal = async (role: RoleFormData) => {
  modalMode.value = 'edit';
  formData.id = role.id;
  formData.name = role.name;
  formData.shortname = role.shortname;
  formData.description = role.description || '';
  formData.archetype = role.archetype || '';
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Submit form
const submitForm = async () => {
  try {
    if (modalMode.value === 'create') {
      await createRole({
        shortname: formData.shortname,
        name: formData.name,
        description: formData.description,
        archetype: formData.archetype
      });
      Notification.addNotification({
        message: stringsStore.getString('rolecreatedsuccessfully'),
        type: 'success'
      });
    } else {
      await updateRole({
        id: formData.id,
        name: formData.name,
        description: formData.description
      });
      Notification.addNotification({
        message: stringsStore.getString('roleupdatedsuccessfully'),
        type: 'success'
      });
    }
    closeModal();
    await loadRoles();
  } catch (err) {
    Notification.exception(err);
  }
};

// Delete role
const deleteRoleConfirm = async (role: RoleFormData) => {
  if (!confirm(stringsStore.getString('roledeleteconfirmation').replace('%s', role.name))) {
    return;
  }

  try {
    await deleteRole({ id: role.id });
    Notification.addNotification({
      message: stringsStore.getString('roledeletedsuccessfully'),
      type: 'success'
    });
    await loadRoles();
  } catch (err) {
    Notification.exception(err);
  }
};

// Calculate pagination info
const paginationInfo = computed(() => {
  const start = (pagination.page - 1) * pagination.perpage + 1;
  const end = Math.min(pagination.page * pagination.perpage, pagination.total);
  return `${start}-${end} of ${pagination.total}`;
});

const totalPages = computed(() => Math.ceil(pagination.total / pagination.perpage));

const goBack = () => {
  router.push('/');
};

</script>

<template>
  <div class="container-fluid p-4">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h1 class="h2 mb-2 mb-md-0">{{ stringsStore.getString('rolesmanagement') }}</h1>
      <div class="d-flex gap-2 mt-2 mt-md-0">
        <button @click="goBack" class="btn btn-secondary">
          <i class="fa fa-arrow-left"></i> {{ stringsStore.getString('backtolist') }}
        </button>
        <button class="btn btn-primary" @click="openCreateModal">
          <i class="fa fa-plus"></i> {{ stringsStore.getString('createnewrole') }}
        </button>
      </div>
    </div>

    <!-- Search bar -->
    <div class="mb-4">
      <div class="row">
        <div class="col-md-8 col-lg-6">
          <div class="input-group">
            <input v-model="searchQuery" type="text" class="form-control"
              :placeholder="stringsStore.getString('rolesearchplaceholder')" @keyup.enter="searchRoles" />
            <button class="btn btn-secondary" @click="searchRoles">
              <i class="fa fa-search"></i> {{ stringsStore.getString('search') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center p-4">
      {{ stringsStore.getString('loadingroles') }}
    </div>

    <!-- Empty state -->
    <div v-else-if="roles.length === 0" class="text-center py-5 text-muted">
      <i class="fa fa-user-tag fa-3x mb-3"></i>
      <h3 class="mb-2">{{ stringsStore.getString('norolesfound') }}</h3>
      <p>{{ stringsStore.getString('norolesfounddesc') }}</p>
      <button class="btn btn-primary mt-3" @click="openCreateModal">
        <i class="fa fa-plus"></i> {{ stringsStore.getString('createnewrole') }}
      </button>
    </div>

    <!-- Roles table -->
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="thead-light">
            <tr>
              <th>{{ stringsStore.getString('roleid') }}</th>
              <th>{{ stringsStore.getString('rolename') }}</th>
              <th>{{ stringsStore.getString('roleshortname') }}</th>
              <th>{{ stringsStore.getString('rolearchetype') }}</th>
              <th class="text-center">{{ stringsStore.getString('roleactions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td>{{ role.id }}</td>
              <td><strong>{{ role.name }}</strong></td>
              <td><code>{{ role.shortname }}</code></td>
              <td>{{ role.archetype || '-' }}</td>
              <td class="text-center">
                <div class="btn-group btn-group-sm" role="group">
                  <button class="btn btn-outline-primary" @click="openEditModal(role)"
                    :title="stringsStore.getString('editrole')">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn btn-outline-danger" @click="deleteRoleConfirm(role)"
                    :title="stringsStore.getString('deleterole')">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-4">
      <nav aria-label="Roles pagination">
        <ul class="pagination justify-content-center justify-content-md-start">
          <li class="page-item" :class="{ 'disabled': pagination.page === 1 }">
            <button class="page-link" @click="prevPage" :disabled="pagination.page === 1">
              <i class="fa fa-chevron-left"></i>
            </button>
          </li>

          <li class="page-item active">
            <span class="page-link">
              {{ paginationInfo }}
            </span>
          </li>

          <li class="page-item" :class="{ 'disabled': pagination.page === totalPages }">
            <button class="page-link" @click="nextPage" :disabled="pagination.page === totalPages">
              <i class="fa fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Modal for Create/Edit Role -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modalMode === 'create' ? stringsStore.getString('createnewrole') : stringsStore.getString('editrole')
              }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <!-- Name field (only for create) -->
              <div v-if="modalMode === 'create'" class="mb-3">
                <label for="name" class="form-label">{{ stringsStore.getString('rolename') }}</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" required />
              </div>

              <!-- Shortname field (only for create) -->
              <div v-if="modalMode === 'create'" class="mb-3">
                <label for="shortname" class="form-label">{{ stringsStore.getString('roleshortname') }}</label>
                <input type="text" class="form-control" id="shortname" v-model="formData.shortname" required />
                <div class="form-text">A unique identifier for this role (no spaces, lowercase recommended)</div>
              </div>

              <!-- Description field -->
              <div class="mb-3">
                <label for="description" class="form-label">{{ stringsStore.getString('description') }}</label>
                <textarea class="form-control" id="description" v-model="formData.description" rows="3"
                  :placeholder="stringsStore.getString('roledescriptionplaceholder')"></textarea>
              </div>

              <!-- Archetype field (only for create) -->
              <div v-if="modalMode === 'create'" class="mb-3">
                <label for="archetype" class="form-label">{{ stringsStore.getString('rolearchetype') }}</label>
                <select class="form-select" id="archetype" v-model="formData.archetype">
                  <option v-for="option in archetypeOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <div class="form-text">{{ stringsStore.getString('rolearchetypeplaceholder') }}</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              {{ stringsStore.getString('cancel') }}
            </button>
            <button type="button" class="btn btn-primary" @click="submitForm">
              {{ modalMode === 'create' ? stringsStore.getString('rolecreate') : stringsStore.getString('roleupdate') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>