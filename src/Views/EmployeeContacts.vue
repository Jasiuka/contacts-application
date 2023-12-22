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
                        v-if="view !== 'cards'"
                        src="./../assets/Icons/Vector.png"
                    />
                    <img
                        v-else
                        class="page-special-action--icon"
                        src="./../assets/Icons/Bullet-List.png"
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
            <contacts-table :contacts="getContacts" v-if="view === 'list'">
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
    },
    methods: {
        ...mapActions(["FetchContacts", "FetchAllStructures"]),
        ...mapMutations(["OPEN_MODAL"]),
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
        changeView() {
            this.view = this.view === "cards" ? "list" : "cards";
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
