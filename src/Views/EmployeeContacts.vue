<template>
    <page-layout page-content-class="contacts-inner">
        <template #page-heading> Kontaktų sistema </template>
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
import { mapActions, mapGetters } from "vuex";
import ContactComponent from "../components/Contacts/Contact.vue";
export default {
    components: {
        ContactComponent,
    },
    computed: {
        ...mapGetters(["getContacts"]),
    },
    methods: {
        ...mapActions(["FetchContacts"]),
    },
    async created() {
        await this.FetchContacts();
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
