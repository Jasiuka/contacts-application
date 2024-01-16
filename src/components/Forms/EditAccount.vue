<template>
    <base-form
        @submit.native.prevent="submitForm"
        submitText="Redaguoti"
        submitClass="submit-button account"
    >
        <template #form-heading>
            <h2>Redaguoti paskyrą</h2>
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
                        :input-value="getAccountToModify.name"
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
                        :input-value="getAccountToModify.email"
                    >
                    </custom-input-with-image>
                    <div class="form-control">
                        <div class="file-upload-wrapper">
                            <input
                                id="file-upload"
                                class="file-upload"
                                name="avatar"
                                type="file"
                                @change="changeAvatarDisplayText"
                                accept="image/png,image/jpeg,image/jpg"
                            />
                            <label class="file-upload__label" for="file-upload"
                                >Įkelti nuotrauką</label
                            >
                            <p class="image-text" v-if="avatar">
                                Nuotrauka: {{ avatar }}
                            </p>
                            <p v-else>Nuotrauka neįkelta</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <h3 class="form-subheading">Adminstracinės teisės</h3>

                <custom-checkbox-select
                    :options="getAccountAvailableSelections"
                    @send-checks="receiveChecks"
                    :checked-options="checked"
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
    deleteObjectKeys,
} from "/src/utils/helper.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
    name: "EditAccount",
    components: {
        CustomInputWithImage,
        CustomCheckboxSelect,
    },
    mixins: [validationMixin],
    data() {
        return {
            avatar: "",
            checks: {},
        };
    },
    computed: {
        ...mapGetters(["getAccountToModify", "getAccountAvailableSelections"]),
        checked() {
            return deleteObjectKeys(
                this.getAccountToModify.expand.permissions_id,
                "id",
                "edit_permissions",
                "created",
                "updated",
                "collectionName",
                "collectionId",
                "read_permissions"
            );
        },
    },
    methods: {
        ...mapActions(["EditAccount"]),
        ...mapMutations(["CLOSE_MODAL"]),
        changeAvatarDisplayText(event) {
            this.avatar = event.target.files[0].name;
        },
        receiveChecks(checks) {
            this.checks = checks;
        },
        submitForm(event) {
            this.invalidFields = [];
            const formContent = event.srcElement.children[1];
            const allFields = formContent.querySelectorAll(
                "input:not([type='checkbox'])"
            );
            // check if any changed
            const allFieldsValuesSame = this.checkIfAnyChanged(
                allFields,
                this.getAccountToModify,
                [{ name: "avatar", value: this.avatar }],
                false
            );

            if (allFieldsValuesSame) {
                this.CLOSE_MODAL();
                return;
            }
            // check if filled
            const allFieldsFilled = this.checkIfAllFieldsFilled(
                allFields,
                "avatar"
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
            const fileInput = formContent.querySelector("[name='avatar']");
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

            const permissions = createPermissionsObject(this.checks);
            const account = createFormDataFromInputsArray(allFields);
            this.EditAccount({
                account,
                permissions,
                accountId: this.getAccountToModify.id,
            });
            this.CLOSE_MODAL();
        },
    },
    created() {
        this.avatar = this.getAccountToModify.avatar
            ? this.getAccountToModify.avatar
            : "";
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
