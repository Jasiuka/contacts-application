<template>
    <page-layout page-special-class="page-special-actions--simple">
        <template #page-heading> Paskyros </template>
        <template #page-special>
            <div class="page-special-actions">
                <div class="wrapper">
                    <button
                        @click="openModal(formTypes.CREATE_ACCOUNT)"
                        title="Sukurti naują admin paskyrą"
                        class="page-add-new page-special-action"
                    >
                        <img
                            class="page-special-action--icon"
                            src="./../assets/Icons/Plus-Math.png"
                        />
                    </button>
                    <p>Sukurti naują admin paskyrą</p>
                </div>
                <p>
                    Iš viso rasta:
                    <b> {{ getAccounts.length }} paskyrų </b>
                </p>
            </div>
        </template>
        <template #content>
            <div class="accounts-list">
                <accounts-table :accounts="getAccounts"></accounts-table>
            </div>
        </template>
    </page-layout>
</template>

<script>
import { formTypes } from "/src/components/Forms/formTypes.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
import AccountsTable from "../components/AdminAccounts/AccountsTable.vue";
export default {
    components: {
        AccountsTable,
    },
    data() {
        return {
            formTypes: formTypes,
        };
    },
    computed: {
        ...mapGetters(["getAccounts"]),
    },
    methods: {
        ...mapActions(["FetchAccounts"]),
        ...mapMutations(["OPEN_MODAL"]),
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
    },
    async created() {
        await this.FetchAccounts();
    },
};
</script>
