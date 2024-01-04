<template>
    <page-layout>
        <template #page-heading> Kontaktų sistema </template>
        <template #page-special>
            <div class="page-special-actions">
                <button
                    class="page-view-change page-special-action"
                    :title="
                        view === `cards`
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
export default {
    components: {
        ContactComponent,
        ContactsTable,
    },
    data() {
        return {
            formTypes,
            view: "cards",
        };
    },
    computed: {
        ...mapGetters(["getContacts"]),
        viewButtonImage() {
            return this.view === "cards" ? BulletListPng : VectorPng;
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
