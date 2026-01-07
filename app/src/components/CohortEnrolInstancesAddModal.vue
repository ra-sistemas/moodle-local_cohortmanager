<script setup lang="ts">
import { useStringsStore } from '../stores/strings';
import CohortEnrolInstancesSearchModal from './CohortEnrolInstancesSearchModal.vue';
import { add } from 'core/toast';

defineProps<{
    cohortid: number;
}>();

const emit = defineEmits<{
    'added:enrolinstances': [value: boolean];
}>();

const stringsStore = useStringsStore();

// Handle selected courses from the search modal
const handleSelectedCourses = (courses: any[]) => {
    // Here you would typically send the selected courses to the backend
    // For now, we'll just emit a success event
    add(stringsStore.getString('enrolinstanceadded'), {
        type: 'success',
        courses: courses
    });
    emit('added:enrolinstances', true);
};
</script>

<template>
    <CohortEnrolInstancesSearchModal 
        :cohortid="cohortid" 
        @selected:courses="handleSelectedCourses" 
    />
</template>