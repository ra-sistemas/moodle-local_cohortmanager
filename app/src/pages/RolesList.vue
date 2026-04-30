<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useStringsStore } from '../stores/strings';
import { getUserContextRoles, deleteRole, showRoleForm } from '../utils/moodle';
import Notification from 'core/notification';
import { add } from 'core/toast';
import { deleteCancel } from 'core/notification';
import type { RoleFormData, Pagination } from '../types/interfaces';
import { useRouter } from 'vue-router';

const router = useRouter();

const stringsStore = useStringsStore();

const roles = ref<RoleFormData[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const pagination = reactive<Pagination>({
  page: 1,
  perpage: 5,
  total: 0
});

onMounted(async () => {
  await loadRoles();
});

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

const searchRoles = () => {
  pagination.page = 1;
  loadRoles();
};

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

const openCreateModal = async () => {
  const modalForm = showRoleForm(
    0,
    stringsStore.getString('createnewrole'),
    stringsStore.getString('rolecreate'),
  );

  modalForm.addEventListener(modalForm.events.FORM_SUBMITTED, () => {
    add(stringsStore.getString('rolecreatedsuccessfully'), {
      type: 'success'
    });
    loadRoles();
  });

  await modalForm.show();
};

const openEditModal = async (role: RoleFormData) => {
  const modalForm = showRoleForm(
    role.id,
    stringsStore.getString('editrole'),
    stringsStore.getString('roleupdate'),
  );

  modalForm.addEventListener(modalForm.events.FORM_SUBMITTED, () => {
    add(stringsStore.getString('roleupdatedsuccessfully'), {
      type: 'success'
    });
    loadRoles();
  });

  await modalForm.show();
};

const deleteRoleConfirm = async (role: RoleFormData) => {
  const title = stringsStore.getString('deleterole');
  const message = stringsStore.getString('roledeleteconfirmation').replace('%s', role.name);
  const deleteLabel = stringsStore.getString('delete');

  await deleteCancel(
    title,
    message,
    deleteLabel,
    async () => {
      try {
        await deleteRole({ roleid: role.id });
        add(stringsStore.getString('roledeletedsuccessfully'), {
          type: 'success'
        });
        await loadRoles();
      } catch (err) {
        Notification.exception(err);
      }
    }
  );
};

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
  <div class="container-fluid px-3 px-md-4 py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
      <h1 class="h3 mb-2 mb-md-0 font-weight-bold">
        <i class="fa fa-user-tag mr-2 text-muted"></i>{{ stringsStore.getString('rolesmanagement') }}
      </h1>
      <div class="d-flex flex-wrap gap-2 mt-2 mt-md-0">
        <button @click="goBack" class="btn btn-outline-secondary">
          <i class="fa fa-arrow-left mr-1"></i> {{ stringsStore.getString('backtolist') }}
        </button>
        <button class="btn btn-primary" @click="openCreateModal">
          <i class="fa fa-plus mr-1"></i> {{ stringsStore.getString('createnewrole') }}
        </button>
      </div>
    </div>

    <div class="card shadow-sm mb-4">
      <div class="card-body py-3">
        <div class="row align-items-center">
          <div class="col-md-6 col-lg-5">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white border-right-0">
                  <i class="fa fa-search text-muted"></i>
                </span>
              </div>
              <input v-model="searchQuery" type="text" class="form-control border-left-0"
                :placeholder="stringsStore.getString('rolesearchplaceholder')" @keyup.enter="searchRoles" />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchRoles">
                  {{ stringsStore.getString('search') }}
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-7 mt-2 mt-md-0">
            <div class="d-flex justify-content-md-end align-items-center">
              <span class="text-muted small" v-if="pagination.total > 0">
                <i class="fa fa-list-ul mr-1"></i>
                {{ pagination.total }} {{ stringsStore.getString('rolescount') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary mb-3" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p class="text-muted">{{ stringsStore.getString('loadingroles') }}</p>
    </div>

    <div v-else-if="roles.length === 0" class="card shadow-sm">
      <div class="card-body text-center py-5">
        <div class="mb-3">
          <i class="fa fa-user-tag fa-3x text-muted"></i>
        </div>
        <h4 class="text-muted mb-2">{{ stringsStore.getString('norolesfound') }}</h4>
        <p class="text-muted mb-4">{{ stringsStore.getString('norolesfounddesc') }}</p>
        <button class="btn btn-primary" @click="openCreateModal">
          <i class="fa fa-plus mr-1"></i> {{ stringsStore.getString('createnewrole') }}
        </button>
      </div>
    </div>

    <div v-else>
      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th style="width: 60px;">{{ stringsStore.getString('roleid') }}</th>
                <th>{{ stringsStore.getString('rolename') }}</th>
                <th>{{ stringsStore.getString('roleshortname') }}</th>
                <th style="width: 160px;">{{ stringsStore.getString('rolearchetype') }}</th>
                <th class="text-center" style="width: 120px;">{{ stringsStore.getString('roleactions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles" :key="role.id">
                <td>
                  <span class="badge badge-light text-muted">{{ role.id }}</span>
                </td>
                <td>
                  <span class="font-weight-bold">{{ role.name }}</span>
                </td>
                <td>
                  <code class="p-1 rounded text-monospace"> {{ role.shortname }}</code>
                </td>
                <td>
                  <span v-if="role.archetype" class="badge badge-info">{{ role.archetype }}</span>
                  <span v-else class="text-muted">&mdash;</span>
                </td>
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
    </div>

    <div v-if="totalPages > 1" class="mt-4">
      <nav aria-label="Roles pagination">
        <ul class="pagination justify-content-center justify-content-md-start mb-0">
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
  </div>
</template>
