<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Redaguoti"
        submitClass="submit-button"
    >
        <template #form-heading>
            <h2>Redaguoti kontaktą</h2>
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
                            :input-value="getContactToModify.name"
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
                            :input-value="getContactToModify.surname"
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
                            :input-value="getContactToModify.position"
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
                            input-name="email"
                            max-length="40"
                            :is-required="true"
                            :is-invalid="invalidFields.includes('email')"
                            :input-value="getContactToModify.email"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Telefono numeris (+37..)"
                            input-type="tel"
                            placeholder="Įveskite telefono numerį"
                            input-name="phone_number"
                            :is-invalid="invalidFields.includes('number')"
                            :input-value="getContactToModify.phone_number"
                            pattern="^[+0-9][0-9]\d{1,16}"
                            max-length="17"
                            min-length="2"
                        ></custom-input>
                    </div>
                </div>
            </div>
            <div class="form-side form-side--selections">
                <h3 class="form-sub-heading">Įmonės detalės:</h3>
                <div key="company" class="form-control">
                    <custom-select
                        labelText="Įmonė"
                        notSelectedText="Pasirinkite įmonę.."
                        selectName="company_id"
                        :options="getCompanies"
                        :is-required="true"
                        :is-invalid="invalidFields.includes('company')"
                        :value-to-select="getSelectedCompany"
                        @set-structure="setter"
                        :should-reset="false"
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
                        :should-reset="false"
                        :is-disabled="officeDisabled"
                    ></custom-select>
                </div>
                <div key="division" class="form-control">
                    <custom-select
                        labelText="Padalinys"
                        notSelectedText="Pasirinkite padalinį.."
                        selectName="division_id"
                        :options="getDivisions"
                        :is-required="true"
                        :value-to-select="getSelectedDivision"
                        :is-invalid="invalidFields.includes('divisions')"
                        @set-structure="setter"
                        :should-reset="false"
                        :is-disabled="divisionDisabled"
                    ></custom-select>
                </div>
                <div key="department" class="form-control">
                    <custom-select
                        labelText="Skyrius"
                        notSelectedText="Pasirinkite skyrių.."
                        selectName="department_id"
                        :options="getDepartments"
                        :value-to-select="getSelectedDepartment"
                        @set-structure="setter"
                        :should-reset="false"
                        :is-disabled="departmentDisabled"
                    ></custom-select>
                </div>
                <div key="group" class="form-control">
                    <custom-select
                        labelText="Grupė"
                        notSelectedText="Pasirinkite grupę.."
                        selectName="group_id"
                        :options="getGroups"
                        :value-to-select="getSelectedGroup"
                        @set-structure="setter"
                        :should-reset="false"
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
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "../../utils/mixins/validationMixin";
import { contactFormMixin } from "../../utils/mixins/contactFormMixin";
import { createFormDataFromInputsArray } from "../../utils/helper";
export default {
    mixins: [validationMixin, contactFormMixin],
    computed: {
        ...mapGetters(["getContactToModify"]),
    },
    methods: {
        ...mapActions([
            "FetchSingleContact",
            "EditContact",
            "FetchSingleContact",
        ]),
        submitForm(event) {
            this.invalidFields = [];
            const formContent = event.srcElement.children[1];
            const allFieldsWithoutFile = formContent.querySelectorAll(
                "input:not([type='file']),select,textarea,checkbox"
            );
            const allFields = formContent.querySelectorAll(
                "input,select,textarea,checkbox"
            );

            const allFieldsValuesSame = this.checkIfAnyChanged(
                allFieldsWithoutFile,
                this.getContactToModify,
                [{ name: "photo", value: this.photo }],
                true
            );
            if (allFieldsValuesSame) {
                return;
            }
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

            this.EditContact({
                id: this.getContactToModify.id,
                dataToUpdate: contact,
            });
            this.CLOSE_MODAL();
        },
    },
    async created() {
        this.photo = this.getContactToModify.photo
            ? this.getContactToModify.photo
            : "";
        await this.FetchCompanies();
        await this.FetchOffices({ id: this.getContactToModify.company_id });
        await this.FetchDivisions({ id: this.getContactToModify.office_id });
        if (this.getContactToModify.division_id) {
            await this.FetchDepartments({
                id: this.getContactToModify.division_id,
            });
        }
        if (this.getContactToModify.department_id) {
            await this.FetchGroups({
                id: this.getContactToModify.department_id,
            });
        }
    },
    mounted() {
        this.SET_SELECTED_COMPANY(this.getContactToModify.company_id);
        this.company = this.getContactToModify.company_id;
        this.SET_SELECTED_OFFICE(this.getContactToModify.office_id);
        this.office = this.getContactToModify.office_id;
        this.SET_SELECTED_DIVISION(this.getContactToModify.division_id);
        this.division = this.getContactToModify.division_id;
        if (this.getContactToModify.department_id) {
            this.SET_SELECTED_DEPARTMENT(this.getContactToModify.department_id);
            this.department = this.getContactToModify.department_id;
        }
        if (this.getContactToModify.group_id) {
            this.SET_SELECTED_GROUP(this.getContactToModify.group_id);
            this.group = this.getContactToModify.group_id;
        }
    },
};
</script>
