<template>
    <base-form @submit.native.prevent="submitForm">
        <template #form-heading>
            <h2>Ar tikrai norite ištrinti {{ forHeading }}?</h2>
        </template>
        <template #form-content>
            <p class="form-delete--content">
                {{ forParagraph }}:
                {{ getStructureToModify.name }}
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
import {
    createStructureStringForName,
    createStructureStringForWhat,
} from "../../utils/helper";
export default {
    computed: {
        ...mapGetters(["getStructureToModify", "getActiveStructureTab"]),
        forHeading() {
            return createStructureStringForWhat(this.getActiveStructureTab);
        },
        forParagraph() {
            return createStructureStringForName(this.getActiveStructureTab);
        },
    },
    methods: {
        ...mapActions(["DeleteStructure"]),
        ...mapMutations(["CLOSE_MODAL"]),
        submitForm() {
            const { id } = this.getStructureToModify;

            this.DeleteStructure({ id });
            this.CLOSE_MODAL();
        },
    },
    mounted() {
        console.log(this.getStructureToModify);
    },
};
</script>
