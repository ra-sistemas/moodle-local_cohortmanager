<template>
    <div v-if="false" class="modal show" style="display: none;">
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { deleteCancel } from 'core/notification';

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

// Watch for show prop changes to show/hide the modal
watch(() => props.show, async (newShow) => {
    if (newShow) {
        await showDeleteConfirmationModal();
    }
});

// Function to show the delete confirmation modal using AMD module
const showDeleteConfirmationModal = async () => {
    try {
        const title = 'Confirm Deletion';
        const question = `Are you sure you want to delete the selected ${selectedMembersCount.value} member${selectedMembersCount.value > 1 ? 's' : ''} from this cohort?`;
        const deleteLabel = 'Delete Members';
        
        // Build the warning message
        const warningMessage = 'Warning: This action is permanent and cannot be undone. The selected members will be permanently removed from this cohort.';
        
        // Build the selected members list if any
        let membersList = '';
        if (selectedMembersList.value.length > 0) {
            const displayed = displayedMembers.value.map(id => props.getMemberFullname(id)).join(', ');
            const remaining = selectedMembersList.value.length - displayLimit;
            membersList = remaining > 0
                ? `Selected members: ${displayed} +${remaining} more`
                : `Selected members: ${displayed}`;
        }
        
        const fullQuestion = `${question}\n\n${warningMessage}${membersList ? '\n\n' + membersList : ''}`;
        
        await deleteCancel(
            title,
            fullQuestion,
            deleteLabel,
            () => {
                // Delete callback - emit confirm event
                emit('confirm');
            },
            () => {
                // Cancel callback - emit close event
                emit('close');
            }
        );
    } catch (error) {
        console.error('Error showing delete confirmation modal:', error);
        emit('close');
    }
};
</script>

<style scoped>

</style>