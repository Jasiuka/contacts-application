<template>
    <div class="filter">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "FilterComponent",
};
</script>

<style scoped>
.filter {
    display: flex;
    align-items: center;
    gap: var(--gap-largest);
}
</style>
