<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useStringsStore } from '../stores/strings';
import { useAppStore } from '../stores/app';

// Define types
interface ContextOption {
  type: string;
  value: string;
  label?: string;
  name?: string;
}

// Initialize store
const stringsStore = useStringsStore();
const appStore = useAppStore();

// Props
const props = defineProps<{
  modelValue: {
    type: string;
    value: string;
  };
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: { type: string; value: string }];
}>();

// State for searchable select
const searchQuery = ref('');
const isDropdownOpen = ref(false);
const selectedOption = ref<{ type: string; value: string; label: string } | null>(null);

// Computed properties
const contextType = computed({
  get: () => props.modelValue.type,
  set: (value: string) => {
    emit('update:modelValue', {
      type: value,
      value: props.modelValue.value
    });
  }
});

const contextValue = computed({
  get: () => props.modelValue.value,
  set: (value: string) => {
    emit('update:modelValue', {
      type: props.modelValue.type,
      value: value
    });
  }
});

// Get context list from store
const contextList = computed<ContextOption[]>(() => {
  return appStore.getContextList() as ContextOption[];
});

// Filter context list based on search query
const filteredContextList = computed<ContextOption[]>(() => {
  if (!searchQuery.value.trim()) {
    return contextList.value;
  }
  
  const query = searchQuery.value.toLowerCase();
  return contextList.value.filter((context: ContextOption) => {
    const label = context.label || '';
    return label.toLowerCase().includes(query);
  });
});

// Handle option selection
const selectOption = (option: ContextOption) => {
  selectedOption.value = {
    type: option.type || 'id',
    value: option.value || '',
    label: option.label || option.name || ''
  };
  
  contextType.value = option.type || 'id';
  contextValue.value = option.value || '';
  isDropdownOpen.value = false;
  searchQuery.value = '';
};

// Handle search input
const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value;
};

// Handle dropdown toggle
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value && !selectedOption.value) {
    // Set default system context
    selectedOption.value = {
      type: 'system',
      value: '',
      label: stringsStore.getString('systemcontext')
    };
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.context-select-dropdown');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

// Watch for changes in modelValue to update selected option
watch(() => props.modelValue, (newValue) => {
  if (newValue.type === 'system') {
    selectedOption.value = {
      type: 'system',
      value: '',
      label: stringsStore.getString('systemcontext')
    };
  } else if (contextList.value.length > 0) {
    const foundOption = contextList.value.find((context: ContextOption) =>
      context.value === newValue.value && context.type === newValue.type
    );
    if (foundOption) {
      selectedOption.value = {
        type: foundOption.type,
        value: foundOption.value,
        label: foundOption.label || foundOption.name || ''
      };
    }
  }
}, { immediate: true });

// Initialize component
onMounted(() => {
  // Add event listener for clicks outside
  document.addEventListener('click', handleClickOutside);
  
  // Fetch context list if not already loaded
  if (contextList.value.length === 0) {
    // The context list should be loaded by the parent component or through app initialization
    console.log('Context list is empty, ensure it is loaded by the app store');
  }
});
</script>

<template>
  <div class="mb-4">
    <label class="form-label">{{ stringsStore.getString('context') }}</label>
    
    <!-- Searchable Select Dropdown -->
    <div class="context-select-dropdown position-relative">
      <div
        class="form-control d-flex justify-content-between align-items-center"
        @click="toggleDropdown"
        :class="{ 'active': isDropdownOpen }"
      >
        <span v-if="selectedOption" class="flex-grow-1">
          {{ selectedOption.label }}
        </span>
        <span v-else class="text-muted">
          {{ stringsStore.getString('selectcontext') }}
        </span>
        <i class="icon fa fa-chevron-down ms-2"></i>
      </div>
      
      <!-- Dropdown Menu -->
      <div v-if="isDropdownOpen" class="dropdown-menu show w-100">
        <!-- Search Input -->
        <div class="px-3 py-2 border-bottom">
          <input
            type="text"
            class="form-control form-control-sm"
            :placeholder="stringsStore.getString('searchcontext')"
            @input="handleSearch"
            @click.stop
          />
        </div>
        
        <!-- Options List -->
        <div class="dropdown-list" style="max-height: 200px; overflow-y: auto;">         
          <!-- Context List Options -->
          <template v-if="filteredContextList.length > 0">
            <div
              v-for="context in filteredContextList"
              :key="context.value"
              class="dropdown-item cursor-pointer"
              @click="selectOption(context)"
            >
              <i class="icon fa me-2" :class="context.type != 'system' ? 'fa-book' : 'fa-desktop'"></i>
              {{ context.label }}
            </div>
          </template>
          
          <!-- No Results -->
          <div v-else class="dropdown-item text-muted text-center py-3">
            {{ stringsStore.getString('nocontextsfound') }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Description for non-system contexts -->
    <div v-if="contextType !== 'system'" class="form-text">
      {{ stringsStore.getString('entercoursecontextid') }}
    </div>
  </div>
</template>

<style scoped>
.context-select-dropdown .form-control {
  cursor: pointer;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out;
}

.context-select-dropdown .form-control:hover,
.context-select-dropdown .form-control.active {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.dropdown-item {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f1f1f1;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item i {
  color: #6c757d;
}

.dropdown-list {
  border: 1px solid #ced4da;
  border-top: none;
}
</style>