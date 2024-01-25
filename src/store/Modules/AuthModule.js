import router from "/src/router/index";
const state = {
    isLoggedIn: false,
    permissions: {},
    isSuperAdmin: false,
    adminAvatar: null,
};
const getters = {
    getLoggedIn: (state) => state.isLoggedIn,
    getPermissions: (state) => state.permissions,
    getIsSuperAdmin: (state) => state.isSuperAdmin,
    getAdminAvatar: (state) => state.adminAvatar,
};
const actions = {
    async Login({ dispatch, commit }, credentials) {
        try {
            const response = await this.dataPost(
                "/users/auth-with-password?expand=permissions_id",
                credentials
            );
            if (response.status === 200) {
                const { token, record } = response.data;
                const isSuper = record.name === "Admin" ? true : false;
                commit("SET_IS_SUPER_ADMIN", isSuper);
                commit("SET_PERMISSIONS_STATE", record.expand.permissions_id);
                commit("SET_AUTH_STATE", true);
                if (record.avatar) {
                    const imageUrl = new URL(
                        `${record.id}/${record.avatar}`,
                        `http://localhost:8090/api/files/_pb_users_auth_/`
                    );
                    commit("SET_ADMIN_AVATAR", imageUrl);
                }
                localStorage.setItem("token", token);
                return { status: 200 };
            }
        } catch (error) {
            if (error.message.includes("Įvyko serverio klaida")) {
                dispatch("CreateNotification", {
                    notificationText: error.message,
                    type: "error",
                });
                return { status: 503 };
            }
            if (error.message.includes("Failed to authenticate")) {
                dispatch("CreateNotification", {
                    notificationText:
                        "Klaida, neteisingas el. paštas arba slaptažodis",
                    type: "error",
                });
            } else {
                dispatch("CreateNotification", {
                    notificationText: "Įvyko klaida bandant prisijungti.",
                    type: "error",
                });
            }
            return { status: 400 };
        }
    },
    async RefreshAuth({ dispatch, commit }) {
        try {
            const response = await this.dataPost(
                "users/auth-refresh?expand=permissions_id"
            );
            if (response.status === 200) {
                const { token, record } = response.data;
                const isSuper = record.name === "Admin" ? true : false;
                commit("SET_IS_SUPER_ADMIN", isSuper);
                commit("SET_PERMISSIONS_STATE", record.expand.permissions_id);
                commit("SET_AUTH_STATE", true);
                if (record.avatar) {
                    const imageUrl = new URL(
                        `${record.id}/${record.avatar}`,
                        `http://localhost:8090/api/files/_pb_users_auth_/`
                    );
                    commit("SET_ADMIN_AVATAR", imageUrl);
                }
                localStorage.setItem("token", token);
            }
        } catch (error) {
            if (error.message != 401) {
                dispatch("CreateNotification", {
                    notificationText: "Įvyko klaida bandant prisijungti.",
                    type: "error",
                });
            } else {
                return;
            }
        }
    },
    async Logout({ dispatch, commit }) {
        try {
            localStorage.removeItem("token");
            commit("SET_AUTH_STATE", false);
            commit("SET_PERMISSIONS_STATE");
            commit("SET_IS_SUPER_ADMIN", false);
            if (router.currentRoute.fullPath !== "/contacts/") {
                router.push({ path: "/contacts" });
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: "Įvyko klaida bandant atsijungti.",
                type: "error",
            });
            console.error(error);
        }
    },
};
const mutations = {
    SET_AUTH_STATE(state, authState) {
        state.isLoggedIn = authState;
    },
    SET_PERMISSIONS_STATE(state, permissionsObj = null) {
        let permissions = {};
        if (permissionsObj) {
            permissions = Object.keys(permissionsObj).reduce((acc, key) => {
                if (key.includes("delete") || key.includes("edit")) {
                    return { ...acc, [key]: permissionsObj[key] };
                } else {
                    return acc;
                }
            }, {});
        }
        state.permissions = permissions;
    },
    SET_IS_SUPER_ADMIN(state, isSuper) {
        state.isSuperAdmin = isSuper;
    },
    SET_ADMIN_AVATAR(state, avatar) {
        state.adminAvatar = avatar;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
