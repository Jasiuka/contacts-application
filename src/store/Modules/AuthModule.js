const state = {
    isLoggedIn: false,
};
const getters = {
    getLoggedIn: (state) => state.isLoggedIn,
};
const actions = {
    async login({ dispatch }, credentials) {
        try {
            const response = await this.dataPost(
                "/users/auth-with-password",
                credentials
            );
            return response;
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: "Įvyko klaida prisijungiant.",
                type: "error",
            });
        }
    },
};
const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};
