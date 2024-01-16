<template>
    <base-table data-table="simple">
        <template #table-head>
            <th>Įmonės pavadinimas</th>
            <th v-if="actionsVisible">Veiksmai</th>
        </template>
        <template #table-body>
            <tr :key="company.id" v-for="company in companies">
                <td>{{ company.name }}</td>
                <td class="row-actions" v-if="actionsVisible">
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
        actionsVisible() {
            return (
                this.getPermissions.edit_companies ||
                this.getPermissions.delete_companies
            );
        },
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
