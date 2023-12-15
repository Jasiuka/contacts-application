<template>
    <div>
        <h1>Home</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import EmployeeContacts from "./EmployeeContacts.vue";
export default {
    components: {
        EmployeeContacts,
    },
};
</script>
