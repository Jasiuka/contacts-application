<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Pridėti"
        submitClass="submit-button company"
    >
        <template #form-heading>
            <h2>Pridėti įmonę</h2>
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
                ></custom-input>
            </div>
        </template>
        <template #form-actions> </template>
    </base-form>
</template>

<script>
import { validationMixin } from "/src/utils/mixins/validationMixin.js";
import { createFormDataFromInputsArray } from "/src/utils/helper.js";
import { mapMutations, mapActions } from "vuex";
export default {
    name: "CreateCompany",
    mixins: [validationMixin],
    methods: {
        ...mapActions(["CreateCompany"]),
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
            const company = createFormDataFromInputsArray([companyName]);
            this.CreateCompany(company);
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
