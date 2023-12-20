<template>
    <page-layout page-content-class="contacts-inner">
        <template #page-heading> Kontaktų sistema </template>
        <template #page-special>
            <button
                @click="openModal(formTypes.CREATE_CONTACT)"
                title="Pridėti naują kontaktą"
                class="page-add-new"
            >
                <img src="./../assets/Icons/Plus-Math.png" />
            </button>
        </template>
        <template #content>
            <contact-component
                v-for="contact in getContacts"
                :key="contact.id"
                :contact="contact"
            ></contact-component>
        </template>
    </page-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { formTypes } from "../components/Forms/formTypes";
import ContactComponent from "../components/Contacts/Contact.vue";
export default {
    components: {
        ContactComponent,
    },
    data() {
        return {
            formTypes,
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
    },
    async created() {
        await this.FetchContacts();
        await this.FetchAllStructures();
    },
};
</script>

<style>
.contacts-inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--gap-medium);
}
</style>
