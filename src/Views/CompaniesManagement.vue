<template>
    <page-layout page-special-class="page-special-actions-companies">
        <template #page-heading> Įmonės </template>
        <template #page-special>
            <div class="page-special-actions">
                <div class="wrapper">
                    <button
                        @click="openModal(formTypes.CREATE_COMPANY)"
                        title="Pridėti naują įmonę"
                        class="page-add-new page-special-action"
                    >
                        <img
                            class="page-special-action--icon"
                            src="./../assets/Icons/Plus-Math.png"
                        />
                    </button>
                    <p>Pridėti naują įmonę</p>
                </div>
                <p>
                    Iš viso rasta:
                    <b> {{ getCompaniesTotalFound }} įmonių </b>
                </p>
            </div>
        </template>
        <template #content>
            <div class="companies-list">
                <companies-table
                    :companies="getCompaniesList"
                ></companies-table>
                <pagination-component
                    :current-page="getCompaniesCurrentPage"
                    :total-pages="getCompaniesTotalPages"
                    @change-page="handlePageChange"
                ></pagination-component>
            </div>
        </template>
    </page-layout>
</template>

<script>
import PaginationComponent from "../components/PaginationComponent.vue";
import CompaniesTable from "../components/Companies/CompaniesTable.vue";
import { formTypes } from "../components/Forms/formTypes";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    name: "CompaniesManagement",
    components: {
        PaginationComponent,
        CompaniesTable,
    },
    data() {
        return {
            formTypes: formTypes,
        };
    },
    computed: {
        ...mapGetters([
            "getCompaniesList",
            "getCompaniesCurrentPage",
            "getCompaniesTotalPages",
            "getCompaniesTotalFound",
        ]),
    },
    methods: {
        ...mapActions(["FetchCompaniesList"]),
        ...mapMutations(["SET_COMPANIES_CURRENT_PAGE", "OPEN_MODAL"]),
        handlePageChange(page) {
            this.SET_COMPANIES_CURRENT_PAGE(page);
            this.FetchCompaniesList();
        },
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
    },
    async created() {
        await this.FetchCompaniesList();
    },
};
</script>

<style>
.page-special-actions-companies > .page-special-actions {
    display: flex;
    flex-direction: column;
    align-items: baseline;
}
.page-special-actions-companies .wrapper {
    display: flex;
    align-items: center;
    gap: var(--gap-medium);
}

.page-special-actions-companies .wrapper p {
    font-size: var(--fs-small);
}

.companies-list {
    min-height: 55dvh;
    display: flex;
    flex-direction: column;
}

.companies-list .pagination {
    margin-top: var(--gap-largest);

    flex: 1;
    align-items: flex-end;
}

.companies-list .pagination-button {
    padding: var(--pd-small) var(--pd-medium);
    font-size: var(--fs-smallest);
}

.companies-list .pagination-numbers {
    font-size: var(--fs-small);
}
</style>
