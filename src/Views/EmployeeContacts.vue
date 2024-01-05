<template>
    <page-layout>
        <template #page-heading> Kontaktų sistema </template>
        <template #page-special>
            <div class="page-special-actions">
                <button
                    class="page-view-change page-special-action"
                    :title="
                        getContactsView === `cards`
                            ? 'Pakeisti į sąrašo vaizdą'
                            : 'Pakeisti į kortelių vaizdą'
                    "
                    @click="changeView"
                >
                    <img
                        class="page-special-action--icon"
                        :src="viewButtonImage"
                    />
                </button>
                <button
                    @click="openModal(formTypes.CREATE_CONTACT)"
                    title="Pridėti naują kontaktą"
                    class="page-add-new page-special-action"
                >
                    <img
                        class="page-special-action--icon"
                        src="./../assets/Icons/Plus-Math.png"
                    />
                </button>
            </div>
            <p>
                Iš viso rasta:
                <b>
                    {{ getContacts?.length }}
                    kontaktų
                </b>
            </p>
            <filter-component>
                <filter-item-select
                    :select-options="getCompanies"
                    option-default="Filtruoti įmones.."
                    select-label="Įmonė"
                    select-name="company_filter"
                    @change-filter="changeFilter"
                ></filter-item-select>
                <filter-item-select
                    :select-options="getOffices"
                    option-default="Filtruoti ofisus.."
                    select-label="Ofisas"
                    select-name="office_filter"
                    @change-filter="changeFilter"
                ></filter-item-select>
                <filter-item-select
                    :select-options="getDivisions"
                    option-default="Filtruoti padalinius.."
                    select-label="Padalinys"
                    select-name="division_filter"
                    @change-filter="changeFilter"
                ></filter-item-select>
                <filter-item-select
                    :select-options="getDepartments"
                    option-default="Filtruoti skyrius.."
                    select-label="Skyrius"
                    select-name="department_filter"
                    @change-filter="changeFilter"
                ></filter-item-select>
                <filter-item-select
                    :select-options="getGroups"
                    option-default="Filtruoti grupes.."
                    select-label="Grupė"
                    select-name="group_filter"
                    @change-filter="changeFilter"
                ></filter-item-select>
            </filter-component>
        </template>
        <template #content>
            <contacts-table
                :contacts="getContacts"
                v-if="getContactsView === 'list'"
            >
            </contacts-table>
            <div class="contacts-list" v-else>
                <contact-component
                    v-for="contact in getContacts"
                    :key="contact.id"
                    :contact="contact"
                ></contact-component>
            </div>
        </template>
    </page-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { formTypes } from "../components/Forms/formTypes";
import ContactComponent from "../components/Contacts/Contact.vue";
import ContactsTable from "../components/Contacts/ContactsTable.vue";
import VectorPng from "../assets/Icons/Vector.png";
import BulletListPng from "../assets/Icons/Bullet-List.png";
import FilterComponent from "../components/Filter/FilterComponent.vue";
import FilterItemSelect from "../components/Filter/FilterItemSelect.vue";
export default {
    components: {
        ContactComponent,
        ContactsTable,
        FilterComponent,
        FilterItemSelect,
    },
    data() {
        return {
            formTypes,
        };
    },
    computed: {
        ...mapGetters([
            "getContacts",
            "getContactsView",
            "getCompanies",
            "getOffices",
            "getDivisions",
            "getDepartments",
            "getGroups",
            "getContactsActiveFilters",
        ]),
        viewButtonImage() {
            return this.getContactsView === "cards" ? BulletListPng : VectorPng;
        },
    },
    methods: {
        ...mapActions([
            "FetchContacts",
            "FetchAllStructures",
            "FetchCompanies",
            "FetchOffices",
            "FetchDivisions",
            "FetchDepartments",
            "FetchGroups",
        ]),
        ...mapMutations([
            "OPEN_MODAL",
            "SET_CONTACTS_VIEW",
            "SET_CONTACTS_FILTER",
        ]),
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
        changeView() {
            const nextView = this.getContactsView === "list" ? "cards" : "list";
            this.SET_CONTACTS_VIEW(nextView);
        },
        changeFilter(filter) {
            this.SET_CONTACTS_FILTER(filter);

            console.log("CHANGED FILTER:", filter);
            if (filter.name === "company_id") {
                this.FetchOffices({ id: filter.value });
            }
            if (filter.name === "office_id") {
                this.FetchDivisions({ id: filter.value });
            }
            if (filter.name === "division_id") {
                this.FetchDepartments({ id: filter.value });
            }
            if (filter.name === "department_id") {
                this.FetchGroups({ id: filter.value });
            }
            this.FetchContacts({ filters: this.getContactsActiveFilters });
        },
    },
    async created() {
        await this.FetchContacts({ filters: this.getContactsActiveFilters });
        await this.FetchAllStructures();
        await this.FetchCompanies();
    },
};
</script>

<style>
.contacts-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gap-medium);
}
</style>
