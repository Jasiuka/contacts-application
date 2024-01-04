<template>
    <router-view></router-view>
</template>

<script>
import EmployeeContacts from "./EmployeeContacts.vue";
import DetailedContactVue from "./DetailedContact.vue";
export default {
    components: {
        EmployeeContacts,
        DetailedContactVue,
    },
};
</script>
