<template>
    <base-form @submit.native.prevent="submitForm">
        <template #form-heading>
            <h2>Ar tikrai norite ištrinti kontaktą?</h2>
        </template>
        <template #form-content>
            <p class="form-delete--content">
                Vardas ir pavardė: {{ getContactToModify.name }}
                {{ getContactToModify.surname }}
            </p>
            <p class="form-delete--content">
                Pozicija: {{ getContactToModify.position }}
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
        ...mapGetters(["getContactToModify"]),
    },
    methods: {
        ...mapActions(["DeleteContact"]),
        ...mapMutations(["CLOSE_MODAL"]),
        submitForm() {
            const { id } = this.getContactToModify;

            this.DeleteContact({ id });
            this.CLOSE_MODAL();
        },
    },
};
</script>

<style></style>
