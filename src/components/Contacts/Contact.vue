<template>
    <base-card
        cardHeaderClass="contact-heading"
        cardContentClass="contact-content"
    >
        <template #card-header>
            <img
                class="contact-avatar"
                :src="
                    contact.photo
                        ? imageUrl
                        : require('../../assets/noPhoto.png')
                "
                :alt="`${contact.name} nuotrauka`"
            />

            <router-link :to="'/contacts/' + contact.id" class="contact-name">
                {{ contact.name }} {{ contact.surname }}
            </router-link>
            <span class="contact-position"
                >Pozicija: {{ contact.position }}</span
            >
        </template>
        <template #card-content>
            <p v-if="contact.phone_number" class="contact-phone">
                Telefono nr: {{ contact.phone_number }}
            </p>
            <p class="contact-email">El. paštas: {{ contact.email }}</p>
            <p class="contact-address">
                Adresas: {{ contact.expand.office_id.name }}
            </p>
        </template>
        <template #card-actions>
            <button
                v-if="getPermissions.delete_employees"
                title="Ištrinti"
                class="contact-delete action-delete action-btn"
                @click="openModal(formTypes.DELETE_CONTACT)"
            >
                <img
                    alt="Ištrinimo paveikslėlis"
                    src="../../assets/Icons/Trash-Can.png"
                />
            </button>
            <button
                v-if="getPermissions.edit_employees"
                @click="openModal(formTypes.EDIT_CONTACT)"
                title="Koreguoti"
                class="contact-edit action-edit action-btn"
            >
                <img
                    src="../../assets/Icons/Pencil-Drawing.png"
                    alt="Koregavimo paveikslėlis"
                />
            </button>
        </template>
    </base-card>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { formTypes } from "../Forms/formTypes";
export default {
    name: "ContactComponent",
    props: {
        contact: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters(["getPermissions"]),
        imageUrl() {
            if (this.contact.photo) {
                const url = new URL(
                    `${this.contact.id}/${this.contact.photo}`,
                    `http://localhost:8090/api/files/b2oym7fr4tkhpsr/`
                );
                return url;
            }
        },
    },
    data() {
        return {
            formTypes,
        };
    },
    methods: {
        ...mapMutations(["OPEN_MODAL", "CLOSE_MODAL", "SET_CONTACT_TO_MODIFY"]),

        openModal(formType) {
            this.SET_CONTACT_TO_MODIFY(this.contact);
            this.OPEN_MODAL(formType);
        },
    },
};
</script>

<style>
.contact-heading {
    display: grid;
    grid-template-columns: 1fr 8fr;
    grid-template-rows: 70% 30%;
    min-width: 100%;
    align-items: center;
    margin-bottom: var(--gap-medium);
    justify-content: baseline;
}

.contact-content {
    display: flex;
    flex-direction: column;
    gap: var(--gap-medium);
    font-weight: 500;
    margin-bottom: var(--gap-medium);
    flex: 1;
}

.contact-avatar {
    grid-column: 1/2;
    grid-row: 1/3;
    display: block;
    object-position: -10px;
    width: 3rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
}

.contact-name {
    grid-column: 2/3;
    grid-row: 1/2;
}

.contact-name:visited,
.contact-name:link,
.contact-name {
    color: inherit;
    font-size: var(--fs-small);
    font-weight: 500;
    border-bottom: 2px solid transparent;
    display: inline-block;
    width: fit-content;
    transition: all 0.3s ease;
}

.contact-name:not(h2):hover {
    border-bottom-color: var(--blue-main);
}

.contact-position {
    grid-column: 2/3;
    grid-row: 2/3;
}
</style>
