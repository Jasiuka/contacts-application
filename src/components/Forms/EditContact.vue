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
                            :input-value="getContactToModify?.name"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Pavardė:"
                            input-type="text"
                            placeholder="Įveskite pavardę"
                            input-name="surname"
                            :input-value="getContactToModify?.surname"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Pozicija"
                            input-type="text"
                            placeholder="Įveskite poziciją"
                            input-name="position"
                            :input-value="getContactToModify?.position"
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
                            :input-value="getContactToModify?.email"
                        ></custom-input>
                    </div>
                    <div class="form-control">
                        <custom-input
                            label-text="Telefono numeris"
                            input-type="text"
                            placeholder="Įveskite telefono numerį"
                            input-name="number"
                            :input-value="getContactToModify?.phone_number"
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
                        :options="testOptions"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Ofisas"
                        notSelectedText="Pasirinkite ofisą.."
                        selectName="office"
                        :options="testOptions"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Padalinys"
                        notSelectedText="Pasirinkite padalinį.."
                        selectName="department"
                        :options="testOptions"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Skyrius"
                        notSelectedText="Pasirinkite skyrių.."
                        selectName="division"
                        :options="testOptions"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Grupė"
                        notSelectedText="Pasirinkite grupę.."
                        selectName="group"
                        :options="testOptions"
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
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            testOptions: [
                { text: "Something", value: 1 },
                { text: "Company", value: 2 },
            ],
        };
    },
    computed: {
        ...mapGetters(["getContactToModify"]),
    },
    methods: {
        ...mapActions(["FetchSingleContact"]),
        submitForm() {},
    },
    async created() {
        await this.FetchSingleContact({ id: this.getContactToModify.id });
    },
};
</script>
