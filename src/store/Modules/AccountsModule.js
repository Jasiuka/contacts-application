import { createFormDataFromObject, generatePassword } from "/src/utils/helper";
const state = {
  accounts: [],
  accountToModify: {},
};
const getters = {
  getAccounts: (state) => state.accounts,
  getAccountToModify: (state) => state.accountToModify,
};
const actions = {
  async FetchAccounts({ dispatch, commit, state }, payload) {
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
      let existingPermission, newPermissionId;
      // Get permissions records
      const permissionsGetResponse = await this.dataGet(
        "/user_permissions/records"
      );
      if (permissionsGetResponse.status === 200) {
        const permissionsRecords = permissionsGetResponse.data.items;
        // Check if there any permissions record with same permissions
        existingPermission = permissionsRecords.find((permissionRecord) => {
          const samePermissions = Object.keys(permissions).every(
            (permissionKey) =>
              permissions[permissionKey] === permissionRecord[permissionKey]
          );
          if (samePermissions) {
            return permissionRecord;
          }
        });
        // If permission exist, assign existing permission to account
        if (existingPermission) {
          account.append("permissions_id", existingPermission.id);
        } else {
          // if permission doesn't exist, create new permission record
          const permissionsFormData = createFormDataFromObject(permissions);
          const permissionPostResponse = await this.dataPost(
            "/user_permissions/records",
            permissionsFormData
          );
          newPermissionId = permissionPostResponse.data.id;
          account.append("permissions_id", newPermissionId);
        }
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
