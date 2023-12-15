import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../Views/NotFound.vue";
import Home from "../Views/Home.vue";
import CompanyStructureManagement from "../Views/CompanyStructureManagement.vue";
import CompaniesManagement from "../Views/CompaniesManagement.vue";
import AdminLogin from "../Views/AdminLogin.vue";
import AdminAccountsManagement from "../Views/AdminAccountsManagement.vue";
import EmployeeContacts from "../Views/EmployeeContacts.vue";
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: { name: "ContactsManagement" },
            component: Home,
            children: [
                {
                    name: "ContactsManagement",
                    path: "/contacts",
                    redirect: { name: "ContactsList" },
                    component: EmployeeContacts,
                    children: [
                        { path: "", name: "ContactsList" },
                        { path: ":contactId", name: "DetailedContact" },
                    ],
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
        },
        {
            path: "/companies",
            name: "CompaniesManagement",
            component: CompaniesManagement,
        },
        {
            path: "/structure",
            name: "CompanyStructures",
            component: CompanyStructureManagement,
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

export default router;
