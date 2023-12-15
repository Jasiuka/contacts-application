import Vue from "vue";
import Vuex from "vuex";
import apiPlugin from "./plugins/apiPlugin";
import NotificationsModule from "./Modules/NotificationsModule";
import ModalModule from "./Modules/ModalModule";
import ContactsModule from "../store/Modules/ContactsModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        NotificationsModule,
        ModalModule,
        ContactsModule,
    },
    plugins: [apiPlugin],
});

export default store;
