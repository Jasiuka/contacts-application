<template>
    <base-table data-table="companies">
        <template #table-head>
            <th>{{ tableHeadName }}</th>
            <th v-if="actionsVisible">Veiksmai</th>
        </template>
        <template #table-body>
            <tr :key="structure.id" v-for="structure in structures">
                <td>{{ structure.name }}</td>
                <td class="row-actions" v-if="actionsVisible">
                    <button
                        v-if="getPermissions.edit_structure"
                        @click="openModal(formTypes.EDIT_STRUCTURE, structure)"
                        title="Koreguoti"
                        class="structure-edit action-edit action-btn"
                    >
                        Redaguoti
                    </button>
                    <button
                        v-if="getPermissions.delete_structure"
                        title="Ištrinti"
                        class="structure-delete action-delete action-btn"
                        @click="
                            openModal(formTypes.DELETE_STRUCTURE, structure)
                        "
                    >
                        Ištrinti
                    </button>
                </td>
            </tr>
        </template>
    </base-table>
</template>

<script>
import BaseTable from "../Base/BaseTable.vue";
import { formTypes } from "/src/components/Forms/formTypes.js";
import { createHigherStructureObject } from "../../utils/helper";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name: "StructuresTable",
    components: {
        BaseTable,
    },
    props: {
        structureName: {
            type: String,
            required: true,
        },
        tableHeadName: {
            type: String,
            required: true,
        },
        structures: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            formTypes: formTypes,
        };
    },
    computed: {
        ...mapGetters(["getPermissions"]),

        actionsVisible() {
            return (
                this.getPermissions.delete_structure &&
                this.getPermissions.edit_structure
            );
        },
    },
    methods: {
        ...mapActions(["FetchStructures", "FetchHigherStructuresSelections"]),
        ...mapMutations([
            "OPEN_MODAL",
            "SET_STRUCTURE_TO_MODIFY",
            "SET_HIGHER_STRUCTURE",
        ]),
        async openModal(formType, structure) {
            await this.SET_STRUCTURE_TO_MODIFY(structure);
            this.FetchHigherStructuresSelections({
                structureId: structure.id,
            });
            this.OPEN_MODAL(formType);
        },
    },
};
</script>

<style></style>
