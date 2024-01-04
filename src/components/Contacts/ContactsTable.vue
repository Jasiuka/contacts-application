<template>
    <base-table>
        <template #table-head>
            <th v-for="headText in tableHead">{{ headText }}</th>
        </template>
        <template #table-body>
            <tr
                @click="routeToDetailedContact(contact.id)"
                class="contact-row"
                v-for="contact in contacts"
                :key="contact.id"
            >
                <td>{{ contact.name }} {{ contact.surname }}</td>
                <td>
                    {{ contact.position }}
                </td>
                <td>{{ contact.phone_number ? contact.phone_number : "-" }}</td>

                <td>{{ contact.email }}</td>
                <td>{{ contact.expand.office_id.name }}</td>
                <td class="row-actions">
                    <button
                        title="Ištrinti"
                        class="contact-delete action-delete action-btn"
                        @click="openModal(formTypes.DELETE_CONTACT, contact)"
                    >
                        <img
                            alt="Ištrinimo paveikslėlis"
                            src="../../assets/Icons/Trash-Can.png"
                        />
                    </button>
                    <button
                        @click="openModal(formTypes.EDIT_CONTACT, contact)"
                        title="Koreguoti"
                        class="contact-edit action-edit action-btn"
                    >
                        <img
                            src="../../assets/Icons/Pencil-Drawing.png"
                            alt="Koregavimo paveikslėlis"
                        />
                    </button>
                </td>
            </tr>
        </template>
    </base-table>
</template>

<script>
import BaseTable from "../Base/BaseTable.vue";
import { formTypes } from "../Forms/formTypes";
import { mapMutations } from "vuex";
export default {
    name: "ContactsTable",
    components: {
        BaseTable,
    },
    props: {
        contacts: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            tableHead: [
                "Vardas ir Pavardė",
                "Pozicija",
                "Telefono numeris",
                "Elektroninis paštas",
                "Adresas",
                "Veiksmai",
            ],
            formTypes,
        };
    },
    methods: {
        ...mapMutations(["OPEN_MODAL", "CLOSE_MODAL", "SET_CONTACT_TO_MODIFY"]),

        openModal(formType, contact) {
            this.SET_CONTACT_TO_MODIFY(contact);
            this.OPEN_MODAL(formType);
        },
        routeToDetailedContact(contactId) {
            this.$router.push({ path: "/contacts/" + contactId });
        },
    },
};
</script>

<style scoped>
.contact-row {
    cursor: pointer;
}
</style>
