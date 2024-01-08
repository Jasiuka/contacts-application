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
                    :value-to-select="getContactsActiveFilters.company_id"
                ></filter-item-select>
                <filter-item-select
                    :select-options="filterStructures.offices"
                    option-default="Filtruoti ofisus.."
                    select-label="Ofisas"
                    select-name="office_filter"
                    @change-filter="changeFilter"
                    :value-to-select="getContactsActiveFilters.office_id"
                ></filter-item-select>
                <filter-item-select
                    :select-options="filterStructures.divisions"
                    option-default="Filtruoti padalinius.."
                    select-label="Padalinys"
                    select-name="division_filter"
                    @change-filter="changeFilter"
                    :value-to-select="getContactsActiveFilters.division_id"
                ></filter-item-select>
                <filter-item-select
                    :select-options="filterStructures.departments"
                    option-default="Filtruoti skyrius.."
                    select-label="Skyrius"
                    select-name="department_filter"
                    @change-filter="changeFilter"
                    :value-to-select="getContactsActiveFilters.department_id"
                ></filter-item-select>
                <filter-item-select
                    :select-options="filterStructures.groups"
                    option-default="Filtruoti grupes.."
                    select-label="Grupė"
                    select-name="group_filter"
                    @change-filter="changeFilter"
                    :value-to-select="getContactsActiveFilters.group_id"
                ></filter-item-select>
            </filter-component>
        </template>
        <template #content>
            <contacts-table
                :contacts="getContacts"
                v-if="getContactsView === 'list' && getContacts.length"
            >
            </contacts-table>
            <div
                class="contacts-list"
                v-if="getContactsView === 'cards' && getContacts.length"
            >
                <contact-component
                    v-for="contact in getContacts"
                    :key="contact.id"
                    :contact="contact"
                ></contact-component>
            </div>
            <h2 v-if="!getContacts.length">
                Atsiprašome, tačiau duomenų nerasta.
            </h2>
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
            filterStructures: {
                offices: [],
                divisions: [],
                departments: [],
                groups: [],
            },
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
            "RESET_CONTACTS_FILTER",
        ]),
        async resetStructuresData(breakpoint) {
            switch (breakpoint) {
                case "all":
                    await this.FetchOffices({ id: "" });
                    await this.FetchDivisions({ id: "" });
                    await this.FetchDepartments({ id: "" });
                    await this.FetchGroups({ id: "" });
                    break;
                case "office":
                    await this.FetchDivisions({ id: "" });
                    await this.FetchDepartments({ id: "" });
                    await this.FetchGroups({ id: "" });
                    break;
                case "division":
                    await this.FetchDepartments({ id: "" });
                    await this.FetchGroups({ id: "" });
                    break;
                case "department":
                    await await this.FetchGroups({ id: "" });
                    break;
            }
        },
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
        setFilter(filter) {
            this.filterStructures = {
                ...this.filterStructures,
                [filter.name]: filter.value,
            };
        },
        changeView() {
            const nextView = this.getContactsView === "list" ? "cards" : "list";
            this.SET_CONTACTS_VIEW(nextView);
        },
        async changeFilter(filter) {
            this.SET_CONTACTS_FILTER(filter);
            this.setFilter(filter);

            if (filter.name === "company_id") {
                await this.FetchOffices({ id: filter.value });
                await this.resetStructuresData("office");
                this.RESET_CONTACTS_FILTER({
                    office_id: "",
                    division_id: "",
                    department_id: "",
                    group_id: "",
                });
            }
            if (filter.name === "office_id") {
                await this.FetchDivisions({ id: filter.value });
                await this.resetStructuresData("division");
                this.RESET_CONTACTS_FILTER({
                    division_id: "",
                    department_id: "",
                    group_id: "",
                });
            }
            if (filter.name === "division_id") {
                await this.FetchDepartments({ id: filter.value });
                await this.resetStructuresData("department");
                this.RESET_CONTACTS_FILTER({ department_id: "", group_id: "" });
            }
            if (filter.name === "department_id") {
                await this.FetchGroups({ id: filter.value });
            }
            this.filterStructures = {
                companies: this.getCompanies,
                offices: this.getOffices,
                divisions: this.getDivisions,
                departments: this.getDepartments,
                groups: this.getGroups,
            };
            this.FetchContacts({ filters: this.getContactsActiveFilters });
        },
    },
    async created() {
        await this.FetchContacts({ filters: this.getContactsActiveFilters });
        await this.FetchCompanies();
    },
    async updated() {
        await this.FetchContacts({ filters: this.getContactsActiveFilters });
    },
    async destroyed() {
        this.RESET_CONTACTS_FILTER({
            company_id: "",
            office_id: "",
            division_id: "",
            department_id: "",
            group_id: "",
        });
        this.resetStructuresData("all");
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
