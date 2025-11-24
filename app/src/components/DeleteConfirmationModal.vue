<template>
    <div v-if="show" class="modal show" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">
                        <i class="bi bi-exclamation-triangle"></i> Confirm Deletion
                    </h5>
                    <button 
                        type="button" 
                        class="btn-close" 
                        @click="$emit('close')"
                        :disabled="deleting"
                    ></button>
                </div>
                <div class="modal-body">
                    <p class="mb-3">
                        Are you sure you want to delete the selected
                        <strong>{{ selectedMembersCount }} member{{ selectedMembersCount > 1 ? 's' : '' }}</strong>
                        from this cohort?
                    </p>
                    <div class="alert alert-warning">
                        <i class="bi bi-exclamation-circle"></i>
                        <strong>Warning:</strong> This action is permanent and cannot be undone.
                        The selected members will be permanently removed from this cohort.
                    </div>
                    <div v-if="selectedMembersList.length > 0" class="mt-3">
                        <small class="text-muted">Selected members:</small>
                        <div class="mt-1">
                            <span 
                                v-for="memberId in displayedMembers" 
                                :key="memberId"
                                class="badge bg-secondary me-1"
                            >
                                {{ getMemberFullname(memberId) }}
                            </span>
                            <span 
                                v-if="selectedMembersList.length > displayLimit" 
                                class="badge bg-secondary"
                            >
                                +{{ selectedMembersList.length - displayLimit }} more
                            </span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-secondary" 
                        @click="$emit('close')"
                        :disabled="deleting"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-danger" 
                        @click="$emit('confirm')"
                        :disabled="deleting"
                    >
                        <span v-if="deleting" class="spinner-border spinner-border-sm me-1" role="status"></span>
                        <i v-else class="bi bi-trash"></i>
                        {{ deleting ? 'Deleting...' : 'Delete Members' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props
const props = defineProps<{
    show: boolean;
    selectedMembers: number[];
    deleting?: boolean;
    getMemberFullname: (memberId: number) => string;
}>();

// Define emits
const emit = defineEmits<{
    close: [];
    confirm: [];
}>();

// Constants
const displayLimit = 15;

// Computed properties
const selectedMembersCount = computed(() => props.selectedMembers.length);
const selectedMembersList = computed(() => props.selectedMembers);
const displayedMembers = computed(() => 
    props.selectedMembers.slice(0, displayLimit)
);
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    max-width: 90vw;
}
</style>