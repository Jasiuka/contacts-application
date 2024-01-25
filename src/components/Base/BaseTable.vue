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
    table-layout: fixed;
    border-collapse: collapse;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    overflow: hidden;
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
    text-align: start;
    font-size: var(--fs-small);
    padding: var(--pd-medium) 0;
}

.table th:first-child,
.table td:first-child {
    padding-left: var(--pd-medium);
}

.table th:last-child,
.table td:last-child {
    padding-right: var(--pd-medium);
}

.table-head--row th {
    font-weight: 600;
}

.row-actions,
.table thead th:last-child {
    text-align: end;
}

.row-actions > button {
    display: inline-block;
}

.row-actions > button:first-child {
    margin-right: var(--gap-smallest);
}

.table thead {
    background-color: rgb(245, 245, 245);
}

.table[data-table="simple"] tbody .action-btn {
    border-radius: var(--border-radius);
    font-size: var(--fs-small);
    color: var(--white-main);
    width: fit-content;
    padding: 0 var(--pd-large);
}
</style>
