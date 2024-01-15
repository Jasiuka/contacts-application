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

.table[data-table="simple"] {
    border-collapse: collapse;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    overflow: hidden;
}
.table[data-table="simple"] thead {
    background-color: rgb(245, 245, 245);
}

.table[data-table="simple"] thead tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pd-small) calc(var(--pd-largest) * 2);
}

.table[data-table="simple"] tbody tr td {
    padding: var(--pd-medium) calc(var(--pd-largest) * 2);
}

.table[data-table="simple"] tbody tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table[data-table="simple"] tbody .action-btn {
    border-radius: var(--border-radius);
    font-size: var(--fs-small);
    color: var(--white-main);
    width: fit-content;
    padding: 0 var(--pd-large);
}
</style>
