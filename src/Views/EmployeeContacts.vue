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
                    :select-options="[
                        { text: 1, id: 1 },
                        { text: 2, id: 2 },
                    ]"
                    option-default="Filtruoti kompanijas.."
                    select-label="Kompanija"
                    select-name="filter_company"
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
        ...mapGetters(["getContacts", "getContactsView"]),
        viewButtonImage() {
            return this.getContactsView === "cards" ? BulletListPng : VectorPng;
        },
    },
    methods: {
        ...mapActions(["FetchContacts", "FetchAllStructures"]),
        ...mapMutations(["OPEN_MODAL", "SET_CONTACTS_VIEW"]),
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
        changeView() {
            const nextView = this.getContactsView === "list" ? "cards" : "list";
            this.SET_CONTACTS_VIEW(nextView);
        },
    },
    async created() {
        await this.FetchContacts();
        await this.FetchAllStructures();
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
