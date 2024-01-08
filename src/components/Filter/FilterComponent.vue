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
    justify-content: space-between;
    overflow-x: auto;
}

@media only screen and (min-width: 140rem) {
    .filter {
        justify-content: unset;
        gap: calc(var(--gap-largest) * 2);
    }
}
</style>
