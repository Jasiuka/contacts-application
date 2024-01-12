<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Redaguoti"
        submitClass="submit-button structure"
    >
        <template #form-heading>
            <h2>Redaguoti {{ forHeading }}</h2>
        </template>
        <template #form-content>
            <div class="form-content-structure">
                <template v-if="getActiveStructureTab !== 'offices'">
                    <div class="form-control">
                        <custom-input
                            :label-text="forLabel"
                            input-type="text"
                            :placeholder="`Įveskite ${forPlaceholder} pavadinimą..`"
                            input-name="name"
                            :is-invalid="invalidFields.includes('name')"
                            max-length="50"
                            :is-required="true"
                            :input-value="getStructureToModify.name"
                        ></custom-input>
                    </div>
                </template>
                <template v-else>
                    <div class="form-control">
                        <custom-input
                            label-text="Gatvė"
                            input-type="text"
                            :placeholder="`Įveskite gatvę..`"
                            input-name="street"
                            :is-invalid="invalidFields.includes('street')"
                            max-length="30"
                            :is-required="true"
                            :input-value="getStructureToModify.street"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Pastato numeris"
                            input-type="text"
                            :placeholder="`Įveskite pastato numerį..`"
                            input-name="street_number"
                            :is-invalid="
                                invalidFields.includes('street_number')
                            "
                            max-length="4"
                            :is-required="true"
                            :input-value="getStructureToModify.street_number"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Miestas"
                            input-type="text"
                            :placeholder="`Įveskite miesto pavadinimą..`"
                            input-name="city"
                            :is-invalid="invalidFields.includes('city')"
                            max-length="30"
                            :is-required="true"
                            :input-value="getStructureToModify.city"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Valstybė"
                            input-type="text"
                            :placeholder="`Įveskite valstybės pavadinimą..`"
                            input-name="country"
                            :is-invalid="invalidFields.includes('country')"
                            max-length="30"
                            :is-required="true"
                            :input-value="getStructureToModify.country"
                        ></custom-input>
                    </div>
                </template>
                <div class="form-control">
                    <custom-multiple-select
                        :options="getStructuresForSelect"
                        :selection-default="`Pasirinkite ${getHigherStructure.placeholder}..`"
                        :label-text="getHigherStructure.nameInLT"
                        @selection-change="changeSelection"
                        :is-invalid="invalidFields.includes('selection')"
                        :got-selected="getHigherStructuresSelection"
                    ></custom-multiple-select>
                </div>
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
import CustomMultipleSelect from "../CustomMultipleSelect.vue";
export default {
    name: "CreateCompany",
    mixins: [validationMixin],
    data() {
        return {
            selected: [],
        };
    },
    components: {
        CustomMultipleSelect,
    },

    computed: {
        ...mapGetters([
            "getActiveStructureTab",
            "getHigherStructure",
            "getStructuresForSelect",
            "getHigherStructuresSelection",
            "getStructureToModify",
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
        ...mapActions(["FetchStructures", "EditStructure"]),
        ...mapMutations(["CLOSE_MODAL"]),
        changeSelection(selections) {
            this.selected = selections;
        },
        submitForm(event) {
            this.invalidFields = [];
            let officeName;
            const formContent = event.srcElement.children[1];
            const allFields = formContent.querySelectorAll(
                "input,select,textarea,checkbox"
            );

            const allFieldsFilled = this.checkIfAllFieldsFilled(allFields);
            if (!allFieldsFilled) return;

            const selectionIsValid = this.checkSelection(
                this.selected,
                "selection",
                `${this.getHigherStructure.nameInLT}`
            );
            if (!selectionIsValid) return;

            // Check structure validity if not office structure
            if (this.getActiveStructureTab !== "offices") {
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

                if (!fieldIsValid || !fieldLengthIsValid) return;
            } else {
                // If office structure
                const street = formContent.querySelector("[name='street']");

                const isStreetValid = this.validator(street, "Gatvė", "street");
                const isStreetLengthValid = this.validator(
                    street,
                    "Gatvė",
                    "length",
                    30
                );

                if (!isStreetValid || !isStreetLengthValid) return;

                const street_number = formContent.querySelector(
                    "[name='street_number']"
                );
                const isStreetNumberValid = this.validator(
                    street_number,
                    "Pastato numeris",
                    "street_number"
                );

                if (!isStreetNumberValid) return;

                const city = formContent.querySelector("[name='city']");
                const country = formContent.querySelector("[name='country']");
                const cityAndCountryNotValid =
                    this.checkMultipleValuesFormatWithRegex(
                        "regular",
                        city,
                        country
                    );

                if (cityAndCountryNotValid) return;

                const isCityLengthValid = this.validator(
                    city,
                    "Miestas",
                    "length",
                    30
                );
                const isCountryLengthValid = this.validator(
                    country,
                    "Valstybė",
                    "length",
                    30
                );

                if (!isCityLengthValid || !isCountryLengthValid) return;
                officeName = `${street.value} ${street_number.value}, ${city.value}, ${country.value}`;
            }

            // check if anything changed
            const allSame = this.checkIfAnyChanged(
                allFields,
                this.getStructureToModify
            );

            const selectionsSame =
                JSON.stringify(this.getHigherStructuresSelection) ===
                JSON.stringify(this.selected);
            if (allSame && selectionsSame) {
                this.CLOSE_MODAL();
                return;
            }
            const structure = createFormDataFromInputsArray(allFields);
            if (officeName) {
                structure.append("name", officeName);
            }

            this.EditStructure({
                dataToUpdate: structure,
                structureId: this.getStructureToModify.id,
                selections: this.selected,
            });
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

.form-content-structure {
    display: flex;
    flex-direction: column;
    gap: var(--gap-medium);
}
</style>
