<template>
    <base-table data-table="simple">
        <template #table-head>
            <th>Vardas</th>
            <th>El. Paštas</th>
            <th v-if="actionsVisible">Veiksmai</th>
        </template>
        <template #table-body>
            <tr :key="account.id" v-for="account in accounts">
                <td>{{ account.name || account.username }}</td>
                <td class="middle">{{ account.email }}</td>
                <td class="row-actions" v-if="actionsVisible">
                    <button
                        v-if="getPermissions.edit_permissions"
                        @click="openModal(formTypes.EDIT_ACCOUNT, account)"
                        title="Koreguoti"
                        class="accounts-edit action-edit action-btn"
                    >
                        Redaguoti
                    </button>
                    <button
                        v-if="getPermissions.delete_permissions"
                        title="Ištrinti"
                        class="accounts-delete action-delete action-btn"
                        @click="openModal(formTypes.DELETE_ACCOUNT, account)"
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
import { mapGetters, mapMutations } from "vuex";
export default {
    components: {
        BaseTable,
    },
    data() {
        return {
            formTypes: formTypes,
        };
    },
    props: {
        accounts: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters(["getPermissions"]),
        actionsVisible() {
            return (
                this.getPermissions.edit_permissions &&
                this.getPermissions.delete_permissions
            );
        },
    },
    methods: {
        ...mapMutations(["OPEN_MODAL", "SET_ACCOUNT_TO_MODIFY"]),
        openModal(formType, account) {
            this.SET_ACCOUNT_TO_MODIFY(account);
            this.OPEN_MODAL(formType);
        },
    },
};
</script>

<style>
.middle {
    margin-left: 10rem;
}
</style>
