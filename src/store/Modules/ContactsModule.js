const state = {
    contacts: [],
};

const getters = {
    getContacts: (state) => state.contacts,
};

const actions = {
    async FetchContacts({ dispatch, commit }) {
        try {
            const response = await this.dataGet(
                "employees/records?expand=office_id"
            );
            if (response.status === 200) {
                const contacts = response.data.items;
                commit("SET_CONTACTS_STATE", contacts);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async DeleteContact({ dispatch }, contact) {
        try {
            const response = await this.dataDelete(
                "employees/records",
                contact.id
            );
            if (response) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas panaikintas sėkmingai",
                    type: "success",
                });
                dispatch("UpdateContacts");
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async UpdateContacts({ dispatch, commit }) {
        try {
            const response = await this.dataGet(
                "employees/records?expand=office_id"
            );
            if (response.status === 200) {
                const contacts = response.data.items;
                commit("SET_CONTACTS_STATE", contacts);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: "Įvyko klaida atnaujinant duomenis",
                type: "error",
            });
        }
    },
};

const mutations = {
    SET_CONTACTS_STATE(state, contacts) {
        state.contacts = contacts;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
