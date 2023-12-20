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
                            label-text="Vardas:"
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
                            label-text="Pavardė:"
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
                            input-type="email"
                            placeholder="Įveskite el.paštą.."
                            input-name="email"
                            :is-required="true"
                            :is-invalid="invalidFields.includes('email')"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Telefono numeris"
                            input-type="number"
                            placeholder="Įveskite telefono numerį"
                            input-name="number"
                            :is-required="true"
                            :is-invalid="invalidFields.includes('number')"
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
                        selectName="company"
                        :options="getStructures().companies"
                        :is-required="true"
                        :is-invalid="invalidFields.includes('company')"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Ofisas"
                        notSelectedText="Pasirinkite ofisą.."
                        selectName="office"
                        :options="getStructures().offices"
                        :is-required="true"
                        :is-invalid="invalidFields.includes('office')"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Padalinys"
                        notSelectedText="Pasirinkite padalinį.."
                        selectName="department"
                        :options="getStructures().departments"
                        :is-invalid="invalidFields.includes('department')"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Skyrius"
                        notSelectedText="Pasirinkite skyrių.."
                        selectName="division"
                        :options="getStructures().divisions"
                        :is-invalid="invalidFields.includes('division')"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Grupė"
                        notSelectedText="Pasirinkite grupę.."
                        selectName="group"
                        :options="getStructures().groups"
                        :is-invalid="invalidFields.includes('group')"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <div class="file-upload-wrapper">
                        <input
                            required
                            id="file-upload"
                            class="file-upload"
                            name="fil"
                            type="file"
                        />
                        <label for="file-upload">Įkelti nuotrauką</label>
                    </div>
                </div>
            </div>
        </template>
        <template #form-actions> </template>
    </base-form>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "../../utils/mixins/validationMixin";
export default {
    mixins: [validationMixin],
    methods: {
        ...mapGetters(["getStructures"]),
        submitForm(event) {
            this.invalidFields = [];
            const formContent = event.srcElement.children[1];
            const allFields = formContent.querySelectorAll(
                "input,select,textarea,checkbox"
            );
            this.checkIfAllFieldsFilled(allFields);
        },
    },
};
</script>
