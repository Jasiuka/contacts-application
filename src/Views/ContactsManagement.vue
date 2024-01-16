<template>
    <router-view :key="routePath"></router-view>
</template>

<script>
import { mapMutations } from "vuex";
import { getFromLocalStorage } from "../utils/helper";
export default {
    computed: {
        routePath() {
            return this.$route.fullPath;
        },
    },
    methods: {
        ...mapMutations(["SET_CONTACTS_CURRENT_PAGE", "SET_CONTACTS_PER_PAGE"]),
    },
    created() {
        const perPageNumber = getFromLocalStorage("contacts_per_page");
        if (perPageNumber) this.SET_CONTACTS_PER_PAGE(perPageNumber);
        if (!perPageNumber) this.SET_CONTACTS_PER_PAGE(25);
    },
    destroyed() {
        this.SET_CONTACTS_CURRENT_PAGE(1);
    },
};
</script>
