import { separateResponsesData } from "../../utils/helper";
const state = {
    structures: null,
};

const getters = {
    getStructures: (state) => state.structures,
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
};

const mutations = {
    SET_STRUCTURES_STATE(state, structures) {
        state.structures = structures;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
