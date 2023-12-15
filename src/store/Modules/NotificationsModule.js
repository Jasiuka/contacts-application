let removeInterval = null;
const state = {
    notifications: [],
};
const getters = {
    getNotifications: (state) => state.notifications,
};
const actions = {
    CreateNotification({ commit }, notification) {
        notification.id = new Date().toISOString();

        commit("ADD_NOTIFICATION", notification);

        if (removeInterval) {
            clearInterval(removeInterval);
            removeInterval = null;
        }

        if (!removeInterval) {
            setInterval(() => {
                commit("REMOVE_NOTIFICATION");
            }, 2000);
        }
    },
};
const mutations = {
    ADD_NOTIFICATION(state, notification) {
        state.notifications.push(notification);
    },

    REMOVE_NOTIFICATION_WITH_CLICK(state, notificationId) {
        const notificationToRemoveIndex = state.notifications.findIndex(
            (notification) => notification.id === notificationId
        );
        state.notifications.splice(notificationToRemoveIndex, 1);
    },
    REMOVE_NOTIFICATION(state) {
        state.notifications = state.notifications.slice(1);
        if (state.notifications.length === 0) {
            clearInterval(removeInterval);
            removeInterval = null;
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
