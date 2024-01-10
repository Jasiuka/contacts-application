<template>
    <page-layout>
        <template #page-heading> Įmonės </template>
        <template #page-special>
            <div class="page-special-actions">
                <div class="wrapper">
                    <button
                        @click="openModal(formTypes.CREATE_CONTACT)"
                        title="Pridėti naują kontaktą"
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
                    <b> 5 įmonių </b>
                </p>
            </div>
        </template>
        <template #page-content>
            <pagination-component></pagination-component>
        </template>
    </page-layout>
</template>

<script>
import PaginationComponent from "../components/PaginationComponent.vue";
export default {
    name: "CompaniesManagement",
    components: {
        PaginationComponent,
    },
};
</script>

<style scoped>
.page-special-actions {
    display: flex;
    flex-direction: column;
    align-items: baseline;
}
.page-special-actions .wrapper {
    display: flex;
    align-items: center;
    gap: var(--gap-medium);
}

.page-special-actions .wrapper p {
    font-size: var(--fs-small);
}
</style>
