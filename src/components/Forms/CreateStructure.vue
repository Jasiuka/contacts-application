<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Pridėti"
        submitClass="submit-button structure"
    >
        <template #form-heading>
            <h2>Pridėti {{ forHeading }}</h2>
        </template>
        <template #form-content>
            <div class="form-control">
                <template v-if="getActiveStructureTab !== 'offices'">
                    <custom-input
                        :label-text="forLabel"
                        input-type="text"
                        :placeholder="`Įveskite ${forPlaceholder} pavadinimą..`"
                        input-name="name"
                        :is-invalid="invalidFields.includes('name')"
                        max-length="50"
                        :is-required="true"
                    ></custom-input>
                </template>
                <template v-else>
                    <custom-input
                        label-text="Gatvė"
                        input-type="text"
                        :placeholder="`Įveskite gatvę..`"
                        input-name="street"
                        :is-invalid="invalidFields.includes('street')"
                        max-length="50"
                        :is-required="true"
                    ></custom-input>
                    <custom-input
                        label-text="Pastato numeris"
                        input-type="number"
                        :placeholder="`Įveskite pastato numerį..`"
                        input-name="street_number"
                        :is-invalid="invalidFields.includes('street_number')"
                        max-length="50"
                        :is-required="true"
                    ></custom-input>
                    <custom-input
                        label-text="Miestas"
                        input-type="text"
                        :placeholder="`Įveskite miesto pavadinimą..`"
                        input-name="city"
                        :is-invalid="invalidFields.includes('city')"
                        max-length="50"
                        :is-required="true"
                    ></custom-input>
                    <custom-input
                        label-text="Valstybė"
                        input-type="text"
                        :placeholder="`Įveskite valstybės pavadinimą..`"
                        input-name="country"
                        :is-invalid="invalidFields.includes('country')"
                        max-length="50"
                        :is-required="true"
                    ></custom-input>
                </template>
                <custom-select
                    :labelText="getHigherStructure.nameInLT"
                    :notSelectedText="`Pasirinkite ${getHigherStructure.placeholder}..`"
                    :selectName="getHigherStructure.structureName"
                    :options="getStructuresForSelect"
                    :is-required="true"
                    :is-invalid="
                        invalidFields.includes(
                            `${getHigherStructure.structureName}`
                        )
                    "
                ></custom-select>
            </div>
        </template>
        <template #form-actions> </template>
    </base-form>
</template>

<script>
import { validationMixin } from "/src/utils/mixins/validationMixin.js";
import {
    createFormDataFromInputsArray,
    createStructureStringForWhat,
    createStructureStringForName,
} from "/src/utils/helper.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
    name: "CreateCompany",
    mixins: [validationMixin],
    computed: {
        ...mapGetters([
            "getActiveStructureTab",
            "getHigherStructure",
            "getStructuresForSelect",
        ]),
        forHeading() {
            return createStructureStringForWhat(this.getActiveStructureTab);
        },
        forLabel() {
            return createStructureStringForName(this.getActiveStructureTab);
        },
        forPlaceholder() {
            if (this.getActiveStructureTab === "divisions") return "padalinio";
            if (this.getActiveStructureTab === "departments") return "skyriaus";
            if (this.getActiveStructureTab === "groups") return "grupės";

            return "";
        },
    },
    methods: {
        ...mapActions(["CreateStructure", "FetchStructures"]),
        ...mapMutations(["CLOSE_MODAL"]),
        submitForm(event) {
            this.invalidFields = [];
            const formContent = event.srcElement.children[1];
            const allFields = formContent.querySelectorAll(
                "input,select,textarea,checkbox"
            );

            const allFieldsFilled = this.checkIfAllFieldsFilled(allFields);
            if (!allFieldsFilled) return;

            if (this.getActiveStructureTab !== "office") {
                const nameField = formContent.querySelector("[name='name']");
                const fieldIsValid = this.validator(
                    nameField,
                    this.forLabel,
                    "special-w-numbers"
                );
                const fieldLengthIsValid = this.validator(
                    nameField,
                    this.forLabel,
                    "length",
                    50
                );
                if (!fieldIsValid && !fieldLengthIsValid) return;
            } else {
            }

            this.CreateStructure(company);
            this.CLOSE_MODAL();
        },
    },
    async created() {
        this.FetchStructures({
            higherStructure: this.getHigherStructure.urlName,
        });
    },
};
</script>

<style>
.form-actions:has(.submit-button.structure) {
    align-self: baseline;
}
</style>
