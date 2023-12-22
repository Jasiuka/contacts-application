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
                        :options="getStructures.companies"
                        :value-to-select="getContactToModify?.company_id"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Ofisas"
                        notSelectedText="Pasirinkite ofisą.."
                        selectName="office"
                        :options="getStructures.offices"
                        :value-to-select="getContactToModify?.office_id"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Padalinys"
                        notSelectedText="Pasirinkite padalinį.."
                        selectName="department"
                        :options="getStructures.departments"
                        :value-to-select="getContactToModify?.department_id"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Skyrius"
                        notSelectedText="Pasirinkite skyrių.."
                        selectName="division"
                        :options="getStructures.divisions"
                        :value-to-select="getContactToModify?.division_id"
                    ></custom-select>
                </div>
                <div class="form-control">
                    <custom-select
                        labelText="Grupė"
                        notSelectedText="Pasirinkite grupę.."
                        selectName="group"
                        :options="getStructures.groups"
                        :value-to-select="getContactToModify?.group_id"
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
                        <label for="file-upload">Įkelti nuotrauką</label>
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
export default {
    data() {
        return {
            photo: "",
        };
    },
    computed: {
        ...mapGetters(["getContactToModify", "getStructures"]),
    },
    methods: {
        ...mapActions(["FetchSingleContact"]),
        changePhotoDisplayText(event) {
            this.photo = event.target.files[0].name;
        },
        submitForm() {},
    },
    async created() {
        await this.FetchSingleContact({ id: this.getContactToModify.id });
    },
};
</script>
