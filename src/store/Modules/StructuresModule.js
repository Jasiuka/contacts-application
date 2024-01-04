import {
    separateResponsesData,
    createStructureObject,
} from "../../utils/helper";
const state = {
    structures: null,
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
    getStructures: (state) => state.structures,
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
    async FetchAllStructures({ dispatch, commit }) {
        try {
            const responses = await this.dataGetMultiple(
                "companies/records",
                "departments/records",
                "offices/records",
                "divisions/records",
                "groups/records"
            );
            const atLeastOneResponseNotOk = responses.some(
                (resp) => resp.status !== 200
            );
            if (atLeastOneResponseNotOk) {
                throw new Error("Įvyko klaida gaunant duomenis iš serverio");
            }
            const separateData = separateResponsesData(responses);
            commit("SET_STRUCTURES_STATE", separateData);
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

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
};

const mutations = {
    SET_STRUCTURES_STATE(state, { name, data }) {
        state.structures = { ...state.structures, [name]: data };
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
