import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import PageLayout from "./components/Base/PageLayout.vue";
import BaseCard from "./components/Base/BaseCard.vue";
import BaseForm from "./components/Base/BaseForm.vue";
import CustomInput from "./components/CustomInput.vue";
import CustomSelect from "./components/CustomSelect.vue";

Vue.component("page-layout", PageLayout);
Vue.component("base-card", BaseCard);
Vue.component("base-form", BaseForm);
Vue.component("custom-input", CustomInput);
Vue.component("custom-select", CustomSelect);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
