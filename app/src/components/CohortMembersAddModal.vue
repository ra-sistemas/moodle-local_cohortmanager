<script setup lang="ts">
import { ref } from 'vue';
import { useStringsStore } from '../stores/strings';
import { showAddMembersForm } from '../utils/moodle';
const props = defineProps<{
    cohortid: number;
}>();

const emit = defineEmits<{
    'added:Members': [value: string];
}>();

const modal = ref();

const stringsStore = useStringsStore();

const openModal = async () => {
    modal.value = showAddMembersForm(
        props.cohortid,
        stringsStore.getString('addmembers'),
        stringsStore.getString('add'),
    );
    console.debug(modal.value);
    await modal.value.show();
}

</script>
<template>
    <button class="btn btn-primary" @click="openModal">{{ stringsStore.getString('addmembers') }}</button>
</template>
