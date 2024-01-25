const state = {
    modalVisible: false,
    modalComponent: "create-contact",
};

const getters = {
    getModalVisible: (state) => state.modalVisible,
    getModalComponent: (state) => state.modalComponent,
};

const mutations = {
    OPEN_MODAL(state, modalComponent) {
        state.modalVisible = true;
        state.modalComponent = modalComponent;
    },
    CLOSE_MODAL(state) {
        state.modalVisible = false;
    },
};

export default {
    state,
    getters,
    mutations,
};
