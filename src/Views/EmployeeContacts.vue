<template>
    <page-layout>
        <template #page-heading> Kontaktų sistema </template>
        <template #page-special>
            <div class="page-special-actions">
                <search-component
                    @send-query="receiveQuery"
                    placeholder="Ieškoti kontakto.."
                ></search-component>
                <per-page-component
                    :toggle-dropdown="toggleDropdown"
                    :is-dropdown-visible="getContactsPerPageDropdownVisible"
                    @set-per-page="handlePerPageChange"
                    :per-page-values="getContactsAvailablePerPageValues"
                    :current-selection="getContactsPerPageNumber"
                ></per-page-component>
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
                    {{ getContactsFoundTotal }}
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
            <pagination-component
                v-show="getContactsPerPageNumber !== 'Visi'"
                custom-class="contacts-pagination"
                @change-page="handlePageChange"
                :current-page="getContactsCurrentPage"
                :total-pages="getContactsTotalPages"
            ></pagination-component>
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
import SearchComponent from "../components/SearchComponent.vue";
import PaginationComponent from "../components/PaginationComponent.vue";
import PerPageComponent from "../components/PerPageComponent.vue";
import { setLocalStorage } from "../utils/helper";
export default {
    components: {
        ContactComponent,
        ContactsTable,
        FilterComponent,
        FilterItemSelect,
        SearchComponent,
        PaginationComponent,
        PerPageComponent,
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
            isDropdownVisible: false,
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
            "getContactsSearchQuery",
            "getContactsCurrentPage",
            "getContactsTotalPages",
            "getContactsAvailablePerPageValues",
            "getContactsPerPageNumber",
            "getContactsPerPageDropdownVisible",
            "getContactsFoundTotal",
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
            "SET_CONTACTS_SEARCH_QUERY",
            "SET_CONTACTS_CURRENT_PAGE",
            "SET_CONTACTS_PER_PAGE",
            "SET_CONTACTS_PER_PAGE_VISIBLE",
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
        toggleDropdown() {
            this.SET_CONTACTS_PER_PAGE_VISIBLE(
                !this.getContactsPerPageDropdownVisible
            );
        },
        async receiveQuery(query) {
            this.SET_CONTACTS_SEARCH_QUERY(query);
            this.SET_CONTACTS_CURRENT_PAGE(1);
            await this.FetchContacts();
        },
        handlePageChange(page) {
            this.SET_CONTACTS_CURRENT_PAGE(page);
            this.FetchContacts({
                filters: this.getContactsActiveFilters,
                searchFields: [
                    "name",
                    "surname",
                    "email",
                    "phone_number",
                    "position",
                ],
                searchQuery: this.getContactsSearchQuery,
            });
            this.SET_CONTACTS_PER_PAGE_VISIBLE(false);
        },
        handlePerPageChange(perPage) {
            this.SET_CONTACTS_PER_PAGE(perPage);
            setLocalStorage("contacts_per_page", perPage);
            this.SET_CONTACTS_CURRENT_PAGE(1);
            this.FetchContacts({
                filters: this.getContactsActiveFilters,
                searchFields: [
                    "name",
                    "surname",
                    "email",
                    "phone_number",
                    "position",
                ],
                searchQuery: this.getContactsSearchQuery,
            });
        },
        openModal(formType) {
            this.OPEN_MODAL(formType);
            this.SET_CONTACTS_PER_PAGE_VISIBLE(false);
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
            this.isDropdownVisible = false;
            this.SET_CONTACTS_PER_PAGE_VISIBLE(false);
        },
        async changeFilter(filter) {
            this.SET_CONTACTS_FILTER(filter);
            this.setFilter(filter);
            this.SET_CONTACTS_PER_PAGE_VISIBLE(false);
            this.SET_CONTACTS_CURRENT_PAGE(1);
            this.isDropdownVisible = false;

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
            await this.FetchContacts();
        },
    },
    async created() {
        await this.FetchContacts();
        await this.FetchCompanies();
    },
    async updated() {
        await this.FetchContacts();
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
        this.SET_CONTACTS_SEARCH_QUERY("");
        this.SET_CONTACTS_PER_PAGE_VISIBLE(false);
    },
};
</script>

<style>
.page-content:has(.contacts-list, .table) {
    display: flex;
    flex-direction: column;
    min-height: 55dvh;
}
.contacts-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gap-medium);
}

.contacts-pagination {
    margin-top: var(--gap-largest);

    flex: 1;
    align-items: flex-end;
}

.contacts-pagination .pagination-button {
    padding: var(--pd-small) var(--pd-medium);
    font-size: var(--fs-smallest);
}

.contacts-pagination .pagination-numbers {
    font-size: var(--fs-small);
}
</style>
