<script setup lang="ts">
import { ref } from 'vue';
import { useStringsStore } from '../stores/strings';
import { showAddEnrolInstancesForm } from '../utils/moodle';
import { add } from 'core/toast';

const props = defineProps<{
    cohortid: number;
}>();

const emit = defineEmits<{
    'added:enrolinstances': [value: boolean];
}>();

const modal = ref();

const stringsStore = useStringsStore();

const openModal = async () => {
    modal.value = showAddEnrolInstancesForm(
        props.cohortid,
        stringsStore.getString('addenrolinstance'),
        stringsStore.getString('add'),
    );

    modal.value.addEventListener(modal.value.events.FORM_SUBMITTED, (event: any) => {
        if (event.detail) {
            add(stringsStore.getString('enrolinstanceadded'), {
                type: 'success'
            });
            emit('added:enrolinstances', event.detail);
        }
        else {

        }
    });

    await modal.value.show();
}

</script>
<template>
    <button class="btn btn-primary" @click="openModal">{{ stringsStore.getString('addenrolinstance') }}</button>
</template>