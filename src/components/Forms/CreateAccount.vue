<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Pridėti"
        submitClass="submit-button account"
    >
        <template #form-heading>
            <h2>Pridėti paskyrą</h2>
        </template>
        <template #form-content>
            <div class="form-side form-side-accounts">
                <div class="form-control">
                    <custom-input
                        label-text="Vardas"
                        input-type="text"
                        placeholder="Įveskite vardą.."
                        input-name="name"
                        :is-invalid="invalidFields.includes('name')"
                        max-length="30"
                        :is-required="true"
                    ></custom-input>
                </div>
                <div class="form-control">
                    <custom-input-with-image
                        label-text="Elektroninis paštas"
                        placeholder="Įveskite el. Paštą.."
                        input-name="email"
                        input-type="email"
                        :is-required="true"
                        :is-invalid="invalidFields.includes('email')"
                        max-length="40"
                        image="/src/assets/Icons/Mail.png"
                    >
                    </custom-input-with-image>
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
            </div>
            <div class="">
                <h3 class="form-subheading">Adminstracinės teisės</h3>

                <custom-checkbox-select
                    :options="selections"
                    @send-checks="receiveChecks"
                ></custom-checkbox-select>
            </div>
        </template>
        <template #form-actions> </template>
    </base-form>
</template>

<script>
import { validationMixin } from "/src/utils/mixins/validationMixin.js";
import CustomInputWithImage from "/src/components/CustomInputWImage.vue";
import CustomCheckboxSelect from "../CustomCheckboxSelect.vue";
import {
    createFormDataFromInputsArray,
    createPermissionsObject,
} from "/src/utils/helper.js";
import { mapMutations, mapActions } from "vuex";
export default {
    name: "CreateAccount",
    components: {
        CustomInputWithImage,
        CustomCheckboxSelect,
    },
    mixins: [validationMixin],
    data() {
        return {
            photo: "",
            selections: [
                {
                    label: "Redaguoti ir kurti kontaktus",
                    name: "edit_employees",
                },
                {
                    label: "Trinti kontaktus",
                    name: "delete_employees",
                },
                {
                    label: "Redaguoti ir kurti įmones",
                    name: "edit_companies",
                },
                {
                    label: "Trinti įmones",
                    name: "delete_companies",
                },
                {
                    label: "Redaguoti ir kurti ofisus",
                    name: "edit_offices",
                },
                {
                    label: "Trinti ofisus",
                    name: "delete_offices",
                },
                {
                    label: "Redaguoti ir kurti struktūras",
                    name: "edit_structure",
                },
                {
                    label: "Trinti struktūras",
                    name: "delete_structure",
                },
            ],
            checks: {},
        };
    },
    methods: {
        ...mapActions(["CreateAccount"]),
        ...mapMutations(["CLOSE_MODAL"]),
        changePhotoDisplayText(event) {
            this.photo = event.target.files[0].name;
        },
        receiveChecks(checks) {
            this.checks = checks;
        },
        submitForm(event) {
            this.invalidFields = [];
            const formContent = event.srcElement.children[1];
            const allFields = formContent.querySelectorAll("input");
            // check if filled
            const allFieldsFilled = this.checkIfAllFieldsFilled(
                allFields,
                "photo"
            );
            if (!allFieldsFilled) return;

            // check format and length
            const name = event.target.name;
            const isNameValid = this.validator(name, "Vardas", "regular");

            if (!isNameValid) {
                return;
            }
            const email = event.target.email;
            const isEmailValid = this.validator(
                email,
                "Elektroninis paštas",
                "email"
            );

            if (!isEmailValid) {
                return;
            }
            const permissions = createPermissionsObject(this.checks);
            console.log(permissions);
            const account = createFormDataFromInputsArray(allFields);
            // this.CreateAccount({ account, permissions });
            this.CLOSE_MODAL();
        },
    },
};
</script>

<style scoped>
.form-side-accounts.form-side > .form-control:first-child {
    margin-bottom: var(--gap-largest);
}
.form-actions:has(.submit-button.company) {
    align-self: baseline;
}

.form-side-accounts.form-side > .form-control > :deep(div) input {
    width: 100%;
}

.form-subheading {
    margin-bottom: var(--gap-small);
    font-size: var(--fs-small);
}
</style>
