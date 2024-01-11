<template>
    <base-table data-table="companies">
        <template #table-head>
            <th>Įmonės pavadinimas</th>
            <th
                v-if="
                    getPermissions.edit_companies &&
                    getPermissions.delete_companies
                "
            >
                Veiksmai
            </th>
        </template>
        <template #table-body>
            <tr :key="company.id" v-for="company in companies">
                <td>{{ company.name }}</td>
                <td
                    class="row-actions"
                    v-if="
                        getPermissions.edit_companies &&
                        getPermissions.delete_companies
                    "
                >
                    <button
                        v-if="getPermissions.edit_companies"
                        @click="openModal(formTypes.EDIT_COMPANY, company)"
                        title="Koreguoti"
                        class="companies-edit action-edit action-btn"
                    >
                        Redaguoti
                    </button>
                    <button
                        v-if="getPermissions.delete_companies"
                        title="Ištrinti"
                        class="companies-delete action-delete action-btn"
                        @click="openModal(formTypes.DELETE_COMPANY, company)"
                    >
                        Ištrinti
                    </button>
                </td>
            </tr>
        </template>
    </base-table>
</template>

<script>
import BaseTable from "../Base/BaseTable.vue";
import { formTypes } from "../Forms/formTypes";
import { mapMutations, mapGetters } from "vuex";
export default {
    name: "CompaniesTable",
    components: {
        BaseTable,
    },
    data() {
        return {
            formTypes: formTypes,
        };
    },
    props: {
        companies: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters(["getPermissions"]),
    },
    methods: {
        ...mapMutations(["OPEN_MODAL", "SET_COMPANY_TO_MODIFY"]),
        openModal(formType, company) {
            this.SET_COMPANY_TO_MODIFY(company);
            this.OPEN_MODAL(formType);
        },
    },
};
</script>

<style>
.table[data-table="companies"] {
    border-collapse: collapse;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    overflow: hidden;
}
.table[data-table="companies"] thead {
    background-color: rgb(245, 245, 245);
}

.table[data-table="companies"] thead tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pd-small) calc(var(--pd-largest) * 2);
}

.table[data-table="companies"] tbody tr td {
    padding: var(--pd-medium) calc(var(--pd-largest) * 2);
}

.table[data-table="companies"] tbody tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table[data-table="companies"] tbody .action-btn {
    border-radius: var(--border-radius);
    font-size: var(--fs-small);
    color: var(--white-main);
    width: fit-content;
    padding: 0 var(--pd-large);
}
</style>
