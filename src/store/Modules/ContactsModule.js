import { createFetchUrlWithFilters } from "../../utils/helper.js";
const state = {
    contacts: [],
    contactToModify: null,
    contactsView: "cards",
    contactsActiveFilters: {},
};

const getters = {
    getContacts: (state) => state.contacts,
    getContactToModify: (state) => state.contactToModify,
    getContactsView: (state) => state.contactsView,
    getContactsActiveFilters: (state) => state.contactsActiveFilters,
};

const actions = {
    async FetchContacts({ dispatch, commit }, payload) {
        try {
            let filters = payload?.filters;
            console.log(filters);
            const url = createFetchUrlWithFilters(
                "employees/records?expand=office_id",
                filters
            );
            console.log(url);
            const response = await this.dataGet(url);
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
                const contact = response.data;
                commit("SET_CONTACT_TO_MODIFY", contact);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
            commit("SET_CONTACT_TO_MODIFY", null);
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

    async EditContact({ dispatch }, contactData) {
        try {
            const response = await this.dataPatch(
                "/employees/records",
                contactData.id,
                contactData.dataToUpdate
            );
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas pakoreguotas sėkmingai",
                    type: "success",
                });
                dispatch("UpdateContacts");
                dispatch("FetchSingleContact", { id: contactData.id });
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
    SET_CONTACTS_VIEW(state, view) {
        state.contactsView = view;
    },
    SET_CONTACTS_FILTER(state, filter) {
        state.contactsActiveFilters = {
            ...state.contactsActiveFilters,
            [filter.name]: filter.value,
        };
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
