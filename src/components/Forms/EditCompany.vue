<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Redaguoti"
        submitClass="submit-button company"
    >
        <template #form-heading>
            <h2>Redaguoti įmonę</h2>
        </template>
        <template #form-content>
            <div class="form-control">
                <custom-input
                    label-text="Įmonės pavadinimas"
                    input-type="text"
                    placeholder="Įveskite įmonės pavadinimą.."
                    input-name="name"
                    :is-invalid="invalidFields.includes('name')"
                    max-length="40"
                    :is-required="true"
                    :input-value="getCompanyToModify.name"
                ></custom-input>
            </div>
        </template>
        <template #form-actions> </template>
    </base-form>
</template>

<script>
import { validationMixin } from "/src/utils/mixins/validationMixin.js";
import { createFormDataFromInputsArray } from "/src/utils/helper.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
    name: "CreateCompany",
    mixins: [validationMixin],
    computed: {
        ...mapGetters(["getCompanyToModify"]),
    },
    methods: {
        ...mapActions(["EditCompany"]),
        ...mapMutations(["CLOSE_MODAL"]),
        submitForm(event) {
            this.invalidFields = [];
            const companyName = event.target.name;
            // check if filled
            if (!companyName.value.trim()) {
                return;
            }
            // check format and length
            const isFieldValid = this.validator(
                companyName,
                "Įmonės pavadinimas",
                "special-w-numbers",
                40
            );
            if (!isFieldValid) {
                return;
            }

            // check if changed
            const notChanged = this.checkIfSingleChanged(
                companyName.value,
                this.getCompanyToModify.name
            );
            if (notChanged) {
                this.CLOSE_MODAL();
                return;
            }
            const company = createFormDataFromInputsArray([companyName]);
            this.EditCompany({
                dataToUpdate: company,
                id: this.getCompanyToModify.id,
            });
            this.CLOSE_MODAL();
        },
    },
};
</script>

<style>
.form-actions:has(.submit-button.company) {
    align-self: baseline;
}
</style>
