<template>
    <router-view :key="routePath"></router-view>
</template>

<script>
export default {
    computed: {
        routePath() {
            return this.$route.fullPath;
        },
    },
};
</script>
