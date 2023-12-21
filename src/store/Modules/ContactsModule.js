const state = {
    contacts: [],
    contactToModify: null,
};

const getters = {
    getContacts: (state) => state.contacts,
    getContactToModify: (state) => state.contactToModify,
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

    async FetchSingleContact({ dispatch, commit }, contact) {
        try {
            const response = await this.dataGetSingle(
                `employees/records/${contact.id}?expand=office_id,company_id,division_id,department_id,group_id`
            );
            if (response.status === 200) {
                const contact = response.data.items;
                commit("SET_CONTACT_TO_MODIFY", contact);
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
            if (response.status === 204) {
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

    async CreateContact({ dispatch }, contact) {
        try {
            const response = await this.dataPost("/employees/records", contact);
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas sukurtas sėkmingai",
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
    SET_CONTACT_TO_MODIFY(state, contact) {
        state.contactToModify = contact;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
