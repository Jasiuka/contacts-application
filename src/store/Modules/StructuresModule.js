import { createStructureObject } from "../../utils/helper";
const state = {
    // FOR STRUCTURES MANAGEMENT
    structures: [],
    activeStructureTab: "offices",
    structuresForSelect: [],
    higherStructureThanActive: {},
    higherStructureSelections: [],
    lowerStructures: [],
    structureToModify: {},
    // FOR FORMS/FILTERS
    selectedCompany: "",
    selectedOffice: "",
    selectedDivision: "",
    selectedDepartment: "",
    selectedGroup: "",
    companies: [],
    offices: [],
    divisions: [],
    departments: [],
    groups: [],
};

const getters = {
    // FOR STRUCTURES MANAGEMENT
    getStructures: (state) => state.structures,
    getActiveStructureTab: (state) => state.activeStructureTab,
    getStructuresForSelect: (state) => state.structuresForSelect,
    getHigherStructure: (state) => state.higherStructureThanActive,
    getHigherStructuresSelection: (state) => state.higherStructureSelections,
    getStructureToModify: (state) => state.structureToModify,
    // FOR FORMS/FILTERS
    getSelectedCompany: (state) => state.selectedCompany,
    getSelectedOffice: (state) => state.selectedOffice,
    getSelectedDivision: (state) => state.selectedDivision,
    getSelectedDepartment: (state) => state.selectedDepartment,
    getSelectedGroup: (state) => state.selectedGroup,
    getCompanies: (state) => state.companies,
    getOffices: (state) => state.offices,
    getDivisions: (state) => state.divisions,
    getDepartments: (state) => state.departments,
    getGroups: (state) => state.groups,
};

const actions = {
    // FOR STRUCTURES MANAGEMENT
    async FetchStructures({ dispatch, commit, state }, payload) {
        try {
            const url = `/${
                payload?.higherStructure
                    ? payload.higherStructure
                    : state.activeStructureTab
            }/records`;

            const response = await this.dataGet(url);
            if (response.status === 200) {
                const structures = response.data.items;
                if (!payload?.higherStructure) {
                    commit("SET_STRUCTURES_STATE", structures);
                } else {
                    commit("SET_STRUCTURES_FOR_SELECT", structures);
                }
            }
        } catch (error) {
            if (payload.edit) {
                dispatch("CreateNotification", {
                    notificationText: "Įvyko klaida atnaujinant duomenis",
                    type: "error",
                });
            }
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async FetchHigherStructuresSelections(
        { dispatch, state, commit },
        { structureId, shouldReturn }
    ) {
        try {
            const higherStructureUrlName =
                state.higherStructureThanActive?.urlName;
            const higherStructureName =
                state.higherStructureThanActive?.structureName;
            const activeStructureName = `${state.activeStructureTab.slice(
                0,
                state.activeStructureTab.length - 1
            )}_id`;
            const response = await this.dataGet(
                `/${higherStructureUrlName}_${state.activeStructureTab}/records?filter=(${activeStructureName}='${structureId}')`
            );
            if (response.status === 200) {
                const structures = response.data.items.map(
                    (item) => item[`${higherStructureName}`]
                );
                commit("SET_HIGHER_STRUCTURES_SELECTIONS", structures);
                if (shouldReturn) return response.data.items;
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async FetchLowerStructures({ dispatch }, { structureId }) {
        try {
            const activeStructureName = `${state.activeStructureTab.slice(
                0,
                state.activeStructureTab.length - 1
            )}_id`;
            const lowerStructure = {
                offices: "divisions",
                divisions: "departments",
                departments: "groups",
            };
            const response = await this.dataGet(
                `/${state.activeStructureTab}_${
                    lowerStructure[state.activeStructureTab]
                }/records?filter=(${activeStructureName}='${structureId}')`
            );
            if (response.status === 200) {
                return response.data.items;
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async DeleteStructure({ dispatch, state }, { id }) {
        try {
            // Check if this structure have any assigned lower structures
            if (state.activeStructureTab !== "groups") {
                const lowerStructures = await dispatch("FetchLowerStructures", {
                    structureId: id,
                });
                if (lowerStructures.length) {
                    dispatch("CreateNotification", {
                        notificationText: `Negalite panaikinti šios struktūros nes jai yra priskirta žemesnė struktūra`,
                        type: "error",
                    });
                    return;
                }
            }
            const response = await this.dataDelete(
                `${state.activeStructureTab}/records`,
                id
            );
            if (response.status === 204) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas panaikintas sėkmingai",
                    type: "success",
                });
                dispatch("FetchStructures", { edit: true });
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async CreateStructure({ dispatch, state }, { structure, selections }) {
        try {
            const response = await this.dataPost(
                `/${state.activeStructureTab}/records`,
                structure
            );
            if (response.status === 200) {
                const { id: structureId } = response.data;
                const structureName = `${state.activeStructureTab.slice(
                    0,
                    state.activeStructureTab.length - 1
                )}_id`;
                const higherStructureName =
                    state.higherStructureThanActive.structureName;
                selections.forEach(async (selection) => {
                    let secondResponse;
                    secondResponse = await this.dataPost(
                        `/${state.higherStructureThanActive.urlName}_${state.activeStructureTab}/records`,
                        {
                            [higherStructureName]: selection,
                            [structureName]: structureId,
                        }
                    );
                });

                dispatch("CreateNotification", {
                    notificationText: "Įrašas sukurtas sėkmingai",
                    type: "success",
                });
                dispatch("FetchStructures");
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async EditStructure(
        { dispatch, state },
        { dataToUpdate, structureId, selections }
    ) {
        try {
            const assignedStructures = await dispatch(
                "FetchHigherStructuresSelections",
                { structureId, shouldReturn: true }
            );
            //Remove existing assigns
            assignedStructures.forEach(async (structure) => {
                await this.dataDelete(
                    `/${state.higherStructureThanActive.urlName}_${state.activeStructureTab}/records`,
                    structure.id
                );
            });

            // Add new assigns
            const structureName = `${state.activeStructureTab.slice(
                0,
                state.activeStructureTab.length - 1
            )}_id`;
            const higherStructureName =
                state.higherStructureThanActive.structureName;
            selections.forEach(async (selection) => {
                await this.dataPost(
                    `/${state.higherStructureThanActive.urlName}_${state.activeStructureTab}/records`,
                    {
                        [higherStructureName]: selection,
                        [structureName]: structureId,
                    }
                );
            });

            // Update record with new data
            const response = await this.dataPatch(
                `/${state.activeStructureTab}/records`,
                structureId,
                dataToUpdate
            );
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas pakoreguotas sėkmingai",
                    type: "success",
                });
                dispatch("FetchStructures");
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    // FOR STRUCTURES MANAGEMENT

    // FOR FORMS/FILTERS
    async FetchCompanies({ dispatch, commit }) {
        try {
            const response = await this.dataGetSingle("companies/records");
            if (response.status === 200) {
                const companies = response.data.items;

                commit("SET_COMPANIES_STATE", companies);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async FetchOffices({ dispatch, commit }, company) {
        try {
            const response = await this.dataGetSingle(
                `/companies/records/${company.id}?expand=companies_offices(company_id).office_id`
            );

            if (response.status === 200) {
                const structure =
                    response.data.expand?.["companies_offices(company_id)"];
                const offices = createStructureObject(structure, "office");
                commit("SET_OFFICES_STATE", offices);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async FetchDivisions({ dispatch, commit }, office) {
        try {
            const response = await this.dataGetSingle(
                `/offices/records/${office.id}?expand=offices_divisions(office_id).division_id`
            );

            if (response.status === 200) {
                const structure =
                    response.data.expand?.["offices_divisions(office_id)"];
                const divisions = createStructureObject(structure, "division");
                commit("SET_DIVISIONS_STATE", divisions);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async FetchDepartments({ dispatch, commit }, division) {
        try {
            const response = await this.dataGetSingle(
                `/divisions/records/${division.id}?expand=divisions_departments(division_id).department_id`
            );

            if (response.status === 200) {
                const structure =
                    response.data.expand?.[
                        "divisions_departments(division_id)"
                    ];
                const departments = createStructureObject(
                    structure,
                    "department"
                );
                commit("SET_DEPARTMENTS_STATE", departments);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async FetchGroups({ dispatch, commit }, department) {
        try {
            const response = await this.dataGetSingle(
                `/departments/records/${department.id}?expand=departments_groups(department_id).group_id`
            );

            if (response.status === 200) {
                const structure =
                    response.data.expand?.["departments_groups(department_id)"];
                const groups = createStructureObject(structure, "group");
                commit("SET_GROUPS_STATE", groups);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    // FOR FORMS/FILTERS
};

const mutations = {
    // FOR STRUCTURES MANAGEMENT
    SET_STRUCTURES_STATE(state, structure) {
        state.structures = structure;
    },
    SET_STRUCTURE_ACTIVE_TAB(state, structure) {
        state.activeStructureTab = structure;
    },
    SET_HIGHER_STRUCTURE(state, structure) {
        state.higherStructureThanActive = structure;
    },
    SET_STRUCTURE_TO_MODIFY(state, structure) {
        state.structureToModify = structure;
    },
    SET_HIGHER_STRUCTURES_SELECTIONS(state, structures) {
        state.higherStructureSelections = structures;
    },
    // FOR FORMS/FILTERS
    SET_STRUCTURES_FOR_SELECT(state, structures) {
        state.structuresForSelect = structures;
    },
    SET_SELECTED_COMPANY(state, companyId) {
        state.selectedCompany = companyId;
    },
    SET_SELECTED_OFFICE(state, officeId) {
        state.selectedOffice = officeId;
    },
    SET_SELECTED_DIVISION(state, divisionId) {
        state.selectedDivision = divisionId;
    },
    SET_SELECTED_DEPARTMENT(state, departmentId) {
        state.selectedDepartment = departmentId;
    },
    SET_SELECTED_GROUP(state, groupId) {
        state.selectedGroup = groupId;
    },
    SET_COMPANIES_STATE(state, companies) {
        state.companies = companies;
    },
    SET_OFFICES_STATE(state, offices) {
        state.offices = offices;
    },
    SET_DIVISIONS_STATE(state, divisions) {
        state.divisions = divisions;
    },
    SET_DEPARTMENTS_STATE(state, departments) {
        state.departments = departments;
    },
    SET_GROUPS_STATE(state, groups) {
        state.groups = groups;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
