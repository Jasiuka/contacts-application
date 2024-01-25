<template>
    <base-form @submit.native.prevent="submitForm">
        <template #form-heading>
            <h2>Ar tikrai norite ištrinti įmonę?</h2>
        </template>
        <template #form-content>
            <p class="form-delete--content">
                Įmonės pavadinimas: {{ getCompanyToModify.name }}
            </p>
        </template>
        <template #form-actions>
            <button
                class="form-delete-button--style"
                type="button"
                @click="CLOSE_MODAL"
            >
                Ne
            </button>
            <button class="form-delete-button--style" type="submit">
                Taip
            </button>
        </template>
    </base-form>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    computed: {
        ...mapGetters(["getCompanyToModify"]),
    },
    methods: {
        ...mapActions(["DeleteCompany"]),
        ...mapMutations(["CLOSE_MODAL"]),
        submitForm() {
            const { id } = this.getCompanyToModify;

            this.DeleteCompany({ id });
            this.CLOSE_MODAL();
        },
    },
};
</script>
