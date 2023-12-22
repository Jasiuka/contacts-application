<template>
    <table class="table">
        <thead>
            <tr class="table-head--row">
                <slot name="table-head"></slot>
            </tr>
        </thead>
        <tbody>
            <slot name="table-body"></slot>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "BaseTable",
};
</script>

<style scoped>
.table {
    min-width: 100%;
}

.table tr {
    box-shadow: 0px 5px 2px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
}

.table tr:has(td):hover {
    background-color: var(--blue-main-lighter);
    color: var(--white-main);
}

.table th,
td {
    padding: var(--pd-small);
    text-align: start;
    font-size: var(--fs-small);
}

.table-head--row th {
    font-weight: 600;
}

.row-actions {
    display: flex;
    align-items: center;
    gap: var(--gap-medium);
}
</style>
