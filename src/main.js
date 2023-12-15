import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import PageLayout from "./components/Base/PageLayout.vue";
import BaseCard from "./components/Base/BaseCard.vue";

Vue.component("page-layout", PageLayout);
Vue.component("base-card", BaseCard);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
