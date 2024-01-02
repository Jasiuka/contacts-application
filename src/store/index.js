import Vue from "vue";
import Vuex from "vuex";
import NotificationsModule from "./Modules/NotificationsModule";
import ModalModule from "./Modules/ModalModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        NotificationsModule,
        ModalModule,
    },
});

export default store;
