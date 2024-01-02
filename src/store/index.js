import Vue from "vue";
import Vuex from "vuex";
import apiPlugin from "./plugins/apiPlugin";
import NotificationsModule from "./Modules/NotificationsModule";
import ModalModule from "./Modules/ModalModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        NotificationsModule,
        ModalModule,
    },
    plugins: [apiPlugin],
});

export default store;
