const state = {
    companiesList: [],
    companiesCurrentPage: 1,
    companiesTotalFound: 0,
    companiesTotalPages: 1,
    companyToModify: {},
};
const getters = {
    getCompaniesList: (state) => state.companiesList,
    getCompanyToModify: (state) => state.companyToModify,
    getCompaniesCurrentPage: (state) => state.companiesCurrentPage,
    getCompaniesTotalPages: (state) => state.companiesTotalPages,
    getCompaniesTotalFound: (state) => state.companiesTotalFound,
};
const actions = {
    async FetchCompaniesList({ dispatch, commit, state }) {
        try {
            const response = await this.dataGet(
                `/companies/records?page=${state.companiesCurrentPage}`
            );
            if (response.status === 200) {
                const companies = response.data.items;
                commit("SET_COMPANIES_LIST", companies);
                commit("SET_COMPANIES_TOTAL_FOUND", response.data.totalItems);
                commit("SET_COMPANIES_TOTAL_PAGES", response.data.totalPages);
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async DeleteCompany({ dispatch, commit, state }, company) {
        try {
            const response = await this.dataDelete(
                "companies/records",
                company.id
            );
            if (response.status === 204) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas panaikintas sėkmingai",
                    type: "success",
                });
                const shouldGoBackOnePage = state.companiesList.length === 1;
                if (shouldGoBackOnePage && state.companiesCurrentPage > 1) {
                    commit(
                        "SET_COMPANIES_CURRENT_PAGE",
                        state.companiesCurrentPage - 1
                    );
                }
                dispatch("UpdateCompanies");
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async CreateCompany({ dispatch }, company) {
        try {
            const response = await this.dataPost("/companies/records", company);
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas sukurtas sėkmingai",
                    type: "success",
                });
                dispatch("UpdateCompanies");
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async EditCompany({ dispatch }, companyData) {
        try {
            const response = await this.dataPatch(
                "/companies/records",
                companyData.id,
                companyData.dataToUpdate
            );
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas pakoreguotas sėkmingai",
                    type: "success",
                });
                dispatch("UpdateCompanies");
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async UpdateCompanies({ dispatch, commit, state }) {
        try {
            const response = await this.dataGet(
                `/companies/records?page=${state.companiesCurrentPage}`
            );
            if (response.status === 200) {
                const companies = response.data.items;
                commit("SET_COMPANIES_LIST", companies);
                commit("SET_COMPANIES_TOTAL_PAGES", response.data.totalPages);
                commit("SET_COMPANIES_TOTAL_FOUND", response.data.totalItems);
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
    SET_COMPANIES_LIST(state, companies) {
        state.companiesList = companies;
    },
    SET_COMPANY_TO_MODIFY(state, company) {
        state.companyToModify = company;
    },
    SET_COMPANIES_CURRENT_PAGE(state, page) {
        state.companiesCurrentPage = page;
    },
    SET_COMPANIES_TOTAL_FOUND(state, total) {
        state.companiesTotalFound = total;
    },
    SET_COMPANIES_TOTAL_PAGES(state, totalPages) {
        state.companiesTotalPages = totalPages;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
