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
        console.log(accounts);
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
      // Create new permission and get id
      const newPermissionResponse = await dispatch("CreatePermission", {
        permissions,
      });

      const newPermissionId = newPermissionResponse.data.id;
      account.append("permissions_id", newPermissionId);

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

  async EditAccount(
    { dispatch },
    { account, permissions, accountId, permissionsId }
  ) {
    try {
      permissions.read_permissions = true;
      await dispatch("EditPermission", {
        permissions,
        permissionsId,
      });

      account.append("permissions_id", permissionsId);
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
  async EditPermission({ dispatch }, { permissions, permissionsId }) {
    try {
      const permissionsFormData = createFormDataFromObject(permissions);
      const response = await this.dataPatch(
        "/user_permissions/records",
        permissionsId,
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
