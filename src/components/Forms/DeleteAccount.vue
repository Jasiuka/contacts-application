<template>
    <base-form @submit.native.prevent="submitForm">
        <template #form-heading>
            <h2>Ar tikrai norite ištrinti paskyrą?</h2>
        </template>
        <template #form-content>
            <p class="form-delete--content">
                Paskyros el. Paštas: {{ getAccountToModify.email }}
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
        ...mapGetters(["getAccountToModify"]),
    },
    methods: {
        ...mapActions(["DeleteAccount"]),
        ...mapMutations(["CLOSE_MODAL"]),
        submitForm() {
            const { id } = this.getAccountToModify;

            this.DeleteAccount({ accountId: id });
            this.CLOSE_MODAL();
        },
    },
};
</script>
