import { createFetchUrlWithFilters } from "../../utils/helper.js";
const state = {
    contacts: [],
    contactToModify: null,
    contactsView: "cards",
    contactsActiveFilters: {},
    contactsSearchQuery: "",
    contactsCurrentPage: 1,
    contactsTotalPages: 1,
};

const getters = {
    getContacts: (state) => state.contacts,
    getContactToModify: (state) => state.contactToModify,
    getContactsView: (state) => state.contactsView,
    getContactsActiveFilters: (state) => state.contactsActiveFilters,
    getContactsSearchQuery: (state) => state.contactsSearchQuery,
    getContactsCurrentPage: (state) => state.contactsCurrentPage,
    getContactsTotalPages: (state) => state.contactsTotalPages,
};

const actions = {
    async FetchContacts({ dispatch, commit }, payload) {
        try {
            let searchFields, searchQuery;
            let filters = payload?.filters;
            let page = payload?.page;
            if (payload.searchFields) {
                searchFields = payload.searchFields;
            }
            if (payload.searchQuery) {
                searchQuery = payload.searchQuery;
            }
            const url = createFetchUrlWithFilters(
                "employees/records?expand=office_id",
                filters,
                searchFields,
                searchQuery
            );
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

    async UpdateContacts({ dispatch, commit, state }) {
        try {
            let url;
            let searchQuery = "";
            const filters = state.contactsActiveFilters;
            const searchFields = ["name", "surname"];
            if (state.contactsSearchQuery) {
                searchQuery = state.contactsSearchQuery;
            }

            if (filters) {
                url = createFetchUrlWithFilters(
                    "employees/records?expand=office_id",
                    filters,
                    searchFields,
                    searchQuery
                );
            } else {
                url = "employees/records?expand=office_id";
            }
            const response = await this.dataGet(url);
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
    RESET_CONTACTS_FILTER(state, stateToReset) {
        state.contactsActiveFilters = {
            ...state.contactsActiveFilters,
            ...stateToReset,
        };
    },
    SET_CONTACTS_SEARCH_QUERY(state, query) {
        state.contactsSearchQuery = query;
    },
    SET_CONTACTS_CURRENT_PAGE(state, page) {
        state.contactsCurrentPage = page;
    },
    SET_CONTACTS_TOTAL_PAGES(state, pageCount) {
        state.contactsTotalPages = pageCount;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
