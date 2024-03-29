import {
    createFetchUrlWithFiltersAndSearch,
    addPaginationDataToUrl,
} from "../../utils/helper.js";
const state = {
    contacts: [],
    contactToModify: null,
    contactsView: "cards",
    contactsActiveFilters: {},
    contactsSearchQuery: "",
    contactsCurrentPage: 1,
    contactsTotalPages: 1,
    contactsPerPageNumber: 10,
    contactsAvailablePerPageValues: [5, 10, 25, 50, 100, "Visi"],
    contactsPerPageDropdownVisible: false,
    contactsFoundTotal: 0,
    contactsSearchFields: [
        "name",
        "surname",
        "email",
        "phone_number",
        "position",
    ],
};

const getters = {
    getContacts: (state) => state.contacts,
    getContactToModify: (state) => state.contactToModify,
    getContactsView: (state) => state.contactsView,
    getContactsActiveFilters: (state) => state.contactsActiveFilters,
    getContactsSearchQuery: (state) => state.contactsSearchQuery,
    getContactsCurrentPage: (state) => state.contactsCurrentPage,
    getContactsTotalPages: (state) => state.contactsTotalPages,
    getContactsPerPageNumber: (state) => state.contactsPerPageNumber,
    getContactsAvailablePerPageValues: (state) =>
        state.contactsAvailablePerPageValues,
    getContactsPerPageDropdownVisible: (state) =>
        state.contactsPerPageDropdownVisible,
    getContactsFoundTotal: (state) => state.contactsFoundTotal,
};

const actions = {
    async FetchContacts({ dispatch, commit, state }, payload) {
        try {
            let url;
            let searchQuery = "";
            const filters = state.contactsActiveFilters;

            if (state.contactsSearchQuery) {
                searchQuery = state.contactsSearchQuery;
            }

            if (filters) {
                url = createFetchUrlWithFiltersAndSearch(
                    "employees/records?expand=office_id",
                    filters,
                    state.contactsSearchFields,
                    searchQuery
                );
            } else {
                url = "employees/records?expand=office_id";
            }
            if (state.contactsPerPageNumber !== "Visi") {
                url = addPaginationDataToUrl(
                    url,
                    state.contactsPerPageNumber,
                    state.contactsCurrentPage
                );
            }
            const response = await this.dataGet(url);
            if (response.status === 200) {
                const contacts = response.data.items;
                commit("SET_CONTACTS_STATE", contacts);
                commit("SET_CONTACTS_TOTAL_PAGES", response.data.totalPages);
                commit("SET_CONTACTS_FOUND_TOTAL", response.data.totalItems);
            }
        } catch (error) {
            if (payload?.edit) {
                dispatch("CreateNotification", {
                    notificationText: "Įvyko klaida atnaujinant duomenis",
                    type: "error",
                });
            }
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
            commit("SET_CONTACTS_TOTAL_PAGES", 1);
            commit("SET_CONTACTS_CURRENT_PAGE", 1);
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

    async DeleteContact({ dispatch, commit, state }, contact) {
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
                const shouldGoBackOnePage = state.contacts.length === 1;
                if (shouldGoBackOnePage && state.contactsCurrentPage > 1) {
                    commit(
                        "SET_CONTACTS_CURRENT_PAGE",
                        state.contactsCurrentPage - 1
                    );
                }
                await dispatch("FetchContacts", { edit: true });
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
                await dispatch("FetchContacts", { edit: true });
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
                await dispatch("FetchContacts", { edit: true });
                await dispatch("FetchSingleContact", { id: contactData.id });
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
    SET_CONTACTS_PER_PAGE(state, perPageNumber) {
        state.contactsPerPageNumber = perPageNumber;
    },
    SET_CONTACTS_PER_PAGE_VISIBLE(state, isVisible) {
        state.contactsPerPageDropdownVisible = isVisible;
    },
    SET_CONTACTS_FOUND_TOTAL(state, total) {
        state.contactsFoundTotal = total;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
