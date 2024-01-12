<template>
    <page-layout page-special-class="page-special-actions-companies">
        <template #page-heading> Struktūra </template>
        <template #page-special>
            <div class="page-special-actions">
                <div class="wrapper">
                    <button
                        @click="openModal(formTypes.CREATE_STRUCTURE)"
                        :title="`Pridėti naują ${structureNameForHeading}`"
                        class="page-add-new page-special-action"
                    >
                        <img
                            class="page-special-action--icon"
                            src="./../assets/Icons/Plus-Math.png"
                        />
                    </button>
                    <p>Pridėti naują {{ structureNameForHeading }}</p>
                </div>
                <p>
                    Iš viso rasta:
                    <b> {{ getStructures.length }} struktūrų </b>
                </p>
                <div class="structure-tabs">
                    <button
                        @click="changeTab('offices')"
                        :class="{
                            'structure-tab--active':
                                getActiveStructureTab === 'offices',
                        }"
                        class="structure-tab"
                    >
                        Ofisai
                    </button>
                    <button
                        @click="changeTab('divisions')"
                        :class="{
                            'structure-tab--active':
                                getActiveStructureTab === 'divisions',
                        }"
                        class="structure-tab"
                    >
                        Padaliniai
                    </button>
                    <button
                        @click="changeTab('departments')"
                        :class="{
                            'structure-tab--active':
                                getActiveStructureTab === 'departments',
                        }"
                        class="structure-tab"
                    >
                        Skyriai
                    </button>
                    <button
                        @click="changeTab('groups')"
                        :class="{
                            'structure-tab--active':
                                getActiveStructureTab === 'groups',
                        }"
                        class="structure-tab"
                    >
                        Grupės
                    </button>
                </div>
            </div>
        </template>
        <template #content>
            <structures-table
                :structures="getStructures"
                :table-head-name="createTableHeadName"
                :structure-name="getActiveStructureTab"
                :structure-name-for-heading="structureNameForHeading"
            ></structures-table>
        </template>
    </page-layout>
</template>

<script>
import StructuresTable from "/src/components/Structures/StructuresTable.vue";
import { formTypes } from "../components/Forms/formTypes";
import { mapActions, mapMutations, mapGetters } from "vuex";
import {
    createStructureStringForWhat,
    createStructureStringForName,
    createHigherStructureObject,
} from "../utils/helper.js";
export default {
    name: "CompanyStructureManagement",
    components: {
        StructuresTable,
    },
    data() {
        return {
            formTypes: formTypes,
        };
    },
    computed: {
        ...mapGetters(["getStructures", "getActiveStructureTab"]),
        createTableHeadName() {
            return createStructureStringForName(this.getActiveStructureTab);
        },
        structureNameForHeading() {
            return createStructureStringForWhat(this.getActiveStructureTab);
        },
    },
    methods: {
        ...mapActions(["FetchStructures"]),
        ...mapMutations([
            "SET_STRUCTURE_ACTIVE_TAB",
            "OPEN_MODAL",
            "SET_HIGHER_STRUCTURE",
        ]),
        async changeTab(structure) {
            this.SET_STRUCTURE_ACTIVE_TAB(structure);
            await this.FetchStructures();
        },
        openModal(formType) {
            this.SET_HIGHER_STRUCTURE(
                createHigherStructureObject(this.getActiveStructureTab)
            );
            this.OPEN_MODAL(formType);
        },
    },
    async created() {
        this.SET_HIGHER_STRUCTURE(
            createHigherStructureObject(this.getActiveStructureTab)
        );
        await this.FetchStructures();
    },
};
</script>

<style scoped>
.structure-tabs {
    display: flex;
    align-items: center;
    gap: var(--gap-medium);
}

.structure-tab {
    font-size: var(--fs-small);
    padding: var(--pd-small) var(--pd-large);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    color: var(--white-main);
    background-color: var(--blue-second);
    transition: all 0.3s ease;
}

.structure-tab:not(.structure-tab--active):hover {
    transform: scale(1.03);
}

.structure-tab--active {
    transform: translateY(6px) scale(1.03);
}
</style>
