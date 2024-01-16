import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../Views/NotFound.vue";
import Home from "../Views/Home.vue";
import CompanyStructureManagement from "../Views/CompanyStructureManagement.vue";
import CompaniesManagement from "../Views/CompaniesManagement.vue";
import AdminLogin from "../Views/AdminLogin.vue";
import AdminAccountsManagement from "../Views/AdminAccountsManagement.vue";
import EmployeeContacts from "../Views/EmployeeContacts.vue";
import ContactsManagement from "../Views/ContactsManagement.vue";
import DetailedContact from "../Views/DetailedContact.vue";
import store from "/src/store/index";
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
            redirect: { name: "ContactsManagement" },
        },
        {
            path: "/contacts",
            name: "ContactsManagement",
            component: ContactsManagement,
            redirect: { name: "EmployeeContacts" },
            children: [
                {
                    path: "",
                    name: "EmployeeContacts",
                    component: EmployeeContacts,
                },
                {
                    path: ":contactId",
                    name: "DetailedContact",
                    component: DetailedContact,
                },
            ],
        },
        {
            path: "/admin-login",
            name: "AdminLogin",
            component: AdminLogin,
        },
        {
            path: "/accounts",
            name: "AdminAccounts",
            component: AdminAccountsManagement,
            meta: {
                requiresSuper: true,
            },
        },
        {
            path: "/companies",
            name: "CompaniesManagement",
            component: CompaniesManagement,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "/structure",
            name: "CompanyStructures",
            component: CompanyStructureManagement,
            meta: {
                requiresLogin: true,
            },
        },
        {
            path: "*",
            redirect: { name: "NotFound" },
        },
        {
            path: "/not-found",
            name: "NotFound",
            component: NotFound,
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (!from.name && !from.matched.length) {
        if (localStorage.getItem("token")) {
            await store.dispatch("RefreshAuth");
        }
    }

    if (to.matched.some((record) => record.meta.requiresLogin === true)) {
        if (!store.getters.getLoggedIn) {
            next({
                path: "/",
            });
        } else {
            next();
        }
    }

    if (to.matched.some((record) => record.meta.requiresSuper === true)) {
        if (!store.getters.getIsSuperAdmin) {
            next({
                path: from.fullPath,
            });
        } else {
            next();
        }
    }

    next();
});

export default router;
