<template>
    <page-layout>
        <template #page-heading> Detalesnė kontakto informacija </template>
        <template #page-special>
            <div
                v-if="getContactToModify?.name"
                class="detailed-contact__actions"
            >
                <p>Kontakto veiksmai</p>
                <button
                    title="Ištrinti"
                    class="contact-delete action-delete action-btn"
                    @click="openModal(formTypes.DELETE_CONTACT)"
                >
                    <img
                        alt="Ištrinimo paveikslėlis"
                        src="../assets/Icons/Trash-Can.png"
                    />
                </button>
                <button
                    @click="openModal(formTypes.EDIT_CONTACT)"
                    title="Koreguoti"
                    class="contact-edit action-edit action-btn"
                >
                    <img
                        src="../assets/Icons/Pencil-Drawing.png"
                        alt="Koregavimo paveikslėlis"
                    />
                </button>
                <div class="line"></div>
            </div>
        </template>
        <template #content>
            <h2 v-if="!getContactToModify?.name">
                Atiprašome, tačiau toks kontaktas nerastas.
            </h2>
            <div v-else>
                <div class="detailed-contact__header">
                    <img
                        class="contact-avatar"
                        :src="
                            getContactToModify?.photo
                                ? imageUrl
                                : require('../assets/noPhoto.png')
                        "
                        :alt="`${getContactToModify?.name} nuotrauka`"
                    />

                    <h2 class="contact-name">
                        {{ getContactToModify.name }}
                        {{ getContactToModify.surname }}
                    </h2>
                    <span class="contact-position"
                        >Pozicija: {{ getContactToModify?.position }}</span
                    >
                </div>
                <div class="detailed-contact__main">
                    <!-- <div class="line"></div> -->
                    <div class="contact-details">
                        <h3>Kontaktinė informacija</h3>
                        <div class="contact-details__content">
                            <ul>
                                <li>
                                    <p>
                                        Elektroninis paštas:
                                        <a
                                            :href="
                                                'mailto:' +
                                                getContactToModify?.email
                                            "
                                        >
                                            {{ getContactToModify?.email }}
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Telefono numeris:
                                        <a
                                            v-if="
                                                getContactToModify?.phone_number
                                            "
                                            :href="
                                                'tel:' +
                                                getContactToModify?.phone_number
                                            "
                                            >{{
                                                getContactToModify?.phone_number
                                            }}</a
                                        >
                                        <span v-else>nepridėta</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="company-details">
                        <h3>Kompanijos informacija</h3>
                        <div class="company-details__content">
                            <ul>
                                <li>
                                    <p>
                                        Įmonė:
                                        {{
                                            getContactToModify?.expand
                                                .company_id
                                                ? getContactToModify.expand
                                                      .company_id.name
                                                : "Nepriskirta"
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Būstinė:
                                        {{
                                            getContactToModify?.expand.office_id
                                                ? getContactToModify.expand
                                                      .office_id.name
                                                : "Nepriskirta"
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Padalinys:
                                        {{
                                            getContactToModify?.expand
                                                .division_id
                                                ? getContactToModify.expand
                                                      .division_id.name
                                                : "Nepriskirta"
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Skyrius:
                                        {{
                                            getContactToModify?.expand
                                                .department_id
                                                ? getContactToModify.expand
                                                      .department_id.name
                                                : "Nepriskirta"
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Grupė:
                                        {{
                                            getContactToModify?.expand.group_id
                                                ? getContactToModify.expand
                                                      .group_id.name
                                                : "Nepriskirta"
                                        }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </page-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { formTypes } from "../components/Forms/formTypes";
export default {
    name: "DetailedContact",
    data() {
        return {
            formTypes,
        };
    },
    computed: {
        ...mapGetters(["getContactToModify"]),
        imageUrl() {
            if (this.getContactToModify.photo) {
                const url = new URL(
                    `${this.getContactToModify.id}/${this.getContactToModify.photo}`,
                    `http://localhost:8090/api/files/b2oym7fr4tkhpsr/`
                );
                return url;
            }
        },
    },
    methods: {
        ...mapActions(["FetchSingleContact"]),
        ...mapMutations(["SET_CONTACT_TO_MODIFY", "OPEN_MODAL"]),
        openModal(formType) {
            this.OPEN_MODAL(formType);
        },
    },
    async created() {
        const contactId = this.$route.params.contactId;
        await this.FetchSingleContact({ id: contactId });
    },
    destroyed() {
        this.SET_CONTACT_TO_MODIFY(null);
    },
};
</script>

<style scoped>
.detailed-contact__header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 70% 30%;
    column-gap: var(--gap-medium);
    min-width: 100%;
    align-items: center;
    margin-bottom: calc(var(--gap-largest) * 1.5);
    justify-content: baseline;
}

.detailed-contact__header .contact-avatar {
    grid-column: 1/2;
    grid-row: 1/3;
    display: block;
    object-position: -10px;
    width: 6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
}

.detailed-contact__header .contact-name {
    font-size: var(--fs-largest);
}

.detailed-contact__header .contact-position {
    font-size: calc(var(--fs-medium) - 0.5rem);
}

.detailed-contact__actions {
    display: flex;
    flex-direction: row;
    margin-bottom: calc(var(--gap-largest) * 2);
    align-items: center;
}

.detailed-contact__actions p {
    font-size: var(--fs-smallest);
    text-transform: uppercase;
    font-weight: 500;
}

.detailed-contact__actions .action-btn {
    border-radius: var(--border-radius);
}

.detailed-contact__actions .line {
    height: 2px;
    flex: 1;
    background-color: var(--blue-main);
}

.detailed-contact__main {
    display: flex;
    align-items: baseline;
    padding: var(--pd-large);
    gap: 15dvw;
    min-width: 100%;
    position: relative;
}

.detailed-contact__main h3 {
    font-size: var(--fs-largest);
    font-weight: 400;
    margin-bottom: calc(var(--gap-largest) * 1.5);
    padding-bottom: var(--pd-medium);
    border-bottom: 2px solid var(--blue-main);
}

.detailed-contact__main ul {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: var(--gap-large);
}

.detailed-contact__main ul li p {
    font-size: var(--fs-medium);
}

.detailed-contact__main .line {
    position: absolute;
    top: 20%;
    left: 0;
    min-width: 100%;
    height: 0px;
    /* background-color: red; */
    box-shadow: 0px 11px 2px 1px rgba(0, 0, 0, 0.1);
    /* box-shadow: 0px 5px 14px 6px rgba(0, 0, 0, 0.1); */
}
</style>
