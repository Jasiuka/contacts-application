<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Pridėti"
        submitClass="submit-button"
    >
        <template #form-heading>
            <h2>Pridėti kontaktą</h2>
        </template>
        <template #form-content>
            <div class="form-side">
                <div>
                    <div class="form-control">
                        <custom-input
                            label-text="Vardas"
                            input-type="text"
                            placeholder="Įveskite vardą"
                            input-name="name"
                            :is-invalid="invalidFields.includes('name')"
                            max-length="20"
                            :is-required="true"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Pavardė"
                            input-type="text"
                            placeholder="Įveskite pavardę"
                            input-name="surname"
                            max-length="30"
                            :is-required="true"
                            :is-invalid="invalidFields.includes('surname')"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Pozicija"
                            input-type="text"
                            placeholder="Įveskite poziciją"
                            input-name="position"
                            max-length="40"
                            :is-required="true"
                            :is-invalid="invalidFields.includes('position')"
                        ></custom-input>
                    </div>
                </div>
                <h3 class="form-sub-heading">Kontaktinė informacija:</h3>
                <div>
                    <div class="form-control">
                        <custom-input
                            label-text="Elektroninis paštas"
                            placeholder="Įveskite el.paštą"
                            input-type="email"
                            max-length="40"
                            input-name="email"
                            :is-required="true"
                            :is-invalid="invalidFields.includes('email')"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Telefono numeris (pvz: +370..)"
                            input-type="tel"
                            placeholder="Įveskite telefono numerį"
                            input-name="phone_number"
                            :is-invalid="invalidFields.includes('number')"
                            pattern="^[+0-9][0-9]\d{1,16}"
                            max-length="17"
                            min-length="2"
                        ></custom-input>
                    </div>
                </div>
            </div>
            <div class="form-side form-side--selections">
                <h3 class="form-sub-heading">Įmonės detalės:</h3>
                <div class="form-control">
                    <custom-select
                        labelText="Įmonė"
                        notSelectedText="Pasirinkite įmonę.."
                        selectName="company_id"
                        :options="getCompanies"
                        :is-required="true"
                        :is-invalid="invalidFields.includes('company')"
                        :value-to-select="getSelectedCompany"
                        @set-structure="setter"
                    ></custom-select>
                </div>
                <div key="office" class="form-control">
                    <custom-select
                        labelText="Ofisas"
                        notSelectedText="Pasirinkite ofisą.."
                        selectName="office_id"
                        :options="getOffices"
                        :is-required="true"
                        :is-invalid="invalidFields.includes('office')"
                        :value-to-select="getSelectedOffice"
                        @set-structure="setter"
                        :is-disabled="officeDisabled"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Padalinys"
                        notSelectedText="Pasirinkite padalinį.."
                        selectName="division_id"
                        :options="getDivisions"
                        :is-required="true"
                        :value-to-select="getSelectedDivision"
                        @set-structure="setter"
                        :is-disabled="divisionDisabled"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Skyrius"
                        notSelectedText="Pasirinkite skyrių.."
                        selectName="department_id"
                        :options="getDepartments"
                        :is-invalid="invalidFields.includes('departments')"
                        :value-to-select="getSelectedDepartment"
                        @set-structure="setter"
                        :is-disabled="departmentDisabled"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Grupė"
                        notSelectedText="Pasirinkite grupę.."
                        selectName="group_id"
                        :options="getGroups"
                        :value-to-select="getSelectedGroup"
                        @set-structure="setter"
                        :is-disabled="groupDisabled"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <div class="file-upload-wrapper">
                        <input
                            id="file-upload"
                            class="file-upload"
                            name="photo"
                            type="file"
                            @change="changePhotoDisplayText"
                            accept="image/png,image/jpeg,image/jpg"
                        />
                        <label class="file-upload__label" for="file-upload"
                            >Įkelti nuotrauką</label
                        >
                        <p class="image-text" v-if="photo">
                            Nuotrauka: {{ photo }}
                        </p>
                        <p v-else>Nuotrauka neįkelta</p>
                    </div>
                </div>
            </div>
        </template>
        <template #form-actions> </template>
    </base-form>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "../../utils/mixins/validationMixin";
import { contactFormMixin } from "../../utils/mixins/contactFormMixin";
import { createFormDataFromInputsArray } from "../../utils/helper";
export default {
    mixins: [validationMixin, contactFormMixin],
    methods: {
        ...mapActions(["CreateContact"]),
        submitForm(event) {
            this.invalidFields = [];
            const formContent = event.srcElement.children[1];
            const allFields = formContent.querySelectorAll(
                "input,select,textarea,checkbox"
            );
            // check if all required fields are filled
            const allFieldsFilled = this.checkIfAllFieldsFilled(
                allFields,
                "phone_number",
                "group_id",
                "department_id",
                "photo"
            );
            if (!allFieldsFilled) return;

            // check email format
            const email = formContent.querySelector("[name='email']");
            const emailIsValid = this.validator(email, "El. Paštas", "email");
            const emailLengthIsValid = this.validator(
                email,
                "El. Paštas",
                "length",
                40
            );
            if (!emailIsValid || !emailLengthIsValid) return;

            // check name,surname,position input formats returns true if at least one invalid
            const multipleValuesInvalid =
                this.checkMultipleValuesFormatWithRegex(
                    "regular",
                    formContent.querySelector("[name='name']"),
                    formContent.querySelector("[name='surname']")
                );
            if (multipleValuesInvalid) return;

            const PositionIsValid = this.validator(
                formContent.querySelector("[name='position']"),
                "Pozicija",
                "special"
            );

            if (!PositionIsValid) return;

            // Check number format
            const numberEl = formContent.querySelector("[name='phone_number']");

            let numberFormatIsValid = true;
            let numberLengthValid = true;

            if (numberEl.value.trim()) {
                numberFormatIsValid = this.validator(
                    numberEl,
                    "Telefono numeris",
                    "phone"
                );
                numberLengthValid = this.validator(
                    numberEl,
                    "Telefono Numeris",
                    "length",
                    17
                );
            }

            if (!numberFormatIsValid || !numberLengthValid) return;
            // Check file format
            const fileInput = formContent.querySelector("[name='photo']");
            if (fileInput.files[0]) {
                const photoValidFormat = this.checkFileFormat(
                    "Nuotrauka",
                    fileInput.files[0].type,
                    "image/png",
                    "image/jpeg",
                    "image/jpg"
                );

                if (!photoValidFormat) return;
            }

            const contact = createFormDataFromInputsArray(allFields);
            this.CreateContact(contact);
            this.CLOSE_MODAL();
        },
    },
    async created() {
        await this.FetchCompanies();
    },
};
</script>

<style>
.image-text {
    word-break: break-word;
    text-overflow: ellipsis;
}
</style>
