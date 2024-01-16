import { createFormDataFromObject, generatePassword } from "/src/utils/helper";
const state = {
    accounts: [],
    accountToModify: {},
    accountAvailablePermissionsSelections: [
        {
            label: "Redaguoti ir kurti kontaktus",
            name: "edit_employees",
        },
        {
            label: "Trinti kontaktus",
            name: "delete_employees",
        },
        {
            label: "Redaguoti ir kurti įmones",
            name: "edit_companies",
        },
        {
            label: "Trinti įmones",
            name: "delete_companies",
        },
        {
            label: "Redaguoti ir kurti ofisus",
            name: "edit_offices",
        },
        {
            label: "Trinti ofisus",
            name: "delete_offices",
        },
        {
            label: "Redaguoti ir kurti struktūras",
            name: "edit_structure",
        },
        {
            label: "Trinti struktūras",
            name: "delete_structure",
        },
    ],
};
const getters = {
    getAccountAvailableSelections: (state) =>
        state.accountAvailablePermissionsSelections,
    getAccounts: (state) => state.accounts,
    getAccountToModify: (state) => state.accountToModify,
};
const actions = {
    async FetchAccounts({ dispatch, commit }, payload) {
        try {
            const response = await this.dataGet(
                `users/records?expand=permissions_id`
            );
            if (response.status === 200) {
                const accounts = response.data.items;
                commit("SET_ACCOUNTS_STATE", accounts);
            }
        } catch (error) {
            if (payload.edit) {
                dispatch("CreateNotification", {
                    notificationText: "Įvyko klaida atnaujinant duomenis",
                    type: "error",
                });
            }
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async DeleteAccount({ dispatch }, { accountId }) {
        try {
            const response = await this.dataDelete("users/records", accountId);
            if (response.status === 204) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas panaikintas sėkmingai",
                    type: "success",
                });
                dispatch("FetchAccounts", { edit: true });
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async CreateAccount({ dispatch }, { account, permissions }) {
        try {
            permissions.read_permissions = true;
            const randomPassword = generatePassword();
            account.append("password", randomPassword);
            account.append("passwordConfirm", randomPassword);
            account.append("emailVisibility", true);
            account.append("verified", false);
            let newPermissionId;
            // Get permissions records
            const existingPermission = await dispatch(
                "FetchPermissionsAndCheck",
                {
                    permissions,
                }
            );

            if (existingPermission) {
                // If permission exist, assign existing permission to account
                account.append("permissions_id", existingPermission);
            } else {
                const newPermissionResponse = await dispatch(
                    "CreatePermission",
                    { permissions }
                );

                newPermissionId = newPermissionResponse.data.id;
                account.append("permissions_id", newPermissionId);
            }
            const response = await this.dataPost("/users/records", account);
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas sukurtas sėkmingai",
                    type: "success",
                });
                dispatch("FetchAccounts", { edit: true });
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },

    async EditAccount({ dispatch }, { account, permissions, accountId }) {
        try {
            permissions.read_permissions = true;
            let newPermissionId;
            // Get permissions records
            const existingPermission = await dispatch(
                "FetchPermissionsAndCheck",
                {
                    permissions,
                }
            );

            if (existingPermission) {
                // If permission exist, assign existing permission to account
                account.append("permissions_id", existingPermission);
            } else {
                const newPermissionResponse = await dispatch(
                    "CreatePermission",
                    {
                        permissions,
                    }
                );

                newPermissionId = newPermissionResponse.data.id;
                account.append("permissions_id", newPermissionId);
            }
            const response = await this.dataPatch(
                "/users/records",
                accountId,
                account
            );
            if (response.status === 200) {
                dispatch("CreateNotification", {
                    notificationText: "Įrašas redaguotas sėkmingai",
                    type: "success",
                });
                dispatch("FetchAccounts", { edit: true });
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async FetchPermissionsAndCheck({ dispatch }, { permissions }) {
        try {
            let existingPermission;
            const response = await this.dataGet("/user_permissions/records");
            if (response.status === 200) {
                const permissionsRecords = response.data.items;
                // Check if there any permissions record with same permissions
                existingPermission = permissionsRecords.find(
                    (permissionRecord) => {
                        const samePermissions = Object.keys(permissions).every(
                            (permissionKey) =>
                                permissions[permissionKey] ===
                                permissionRecord[permissionKey]
                        );
                        if (samePermissions) {
                            return permissionRecord;
                        }
                    }
                );

                return existingPermission?.id
                    ? existingPermission.id
                    : existingPermission;
            }
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
    async CreatePermission({ dispatch }, { permissions }) {
        try {
            const permissionsFormData = createFormDataFromObject(permissions);
            const response = await this.dataPost(
                "/user_permissions/records",
                permissionsFormData
            );
            return response;
        } catch (error) {
            dispatch("CreateNotification", {
                notificationText: error.message,
                type: "error",
            });
        }
    },
};
const mutations = {
    SET_ACCOUNTS_STATE(state, accounts) {
        state.accounts = accounts;
    },
    SET_ACCOUNT_TO_MODIFY(state, account) {
        state.accountToModify = account;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
