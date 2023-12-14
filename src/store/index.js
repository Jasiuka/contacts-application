import Vue from "vue";
import Vuex from "vuex";
import NotificationsModule from "./Modules/NotificationsModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        NotificationsModule,
    },
});

export default store;
