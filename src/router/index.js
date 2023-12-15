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
                    path: "/kontaktai",
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
            path: "/paskyros",
            name: "AdminAccounts",
            component: AdminAccountsManagement,
        },
        {
            path: "/imones",
            name: "CompaniesManagement",
            component: CompaniesManagement,
        },
        {
            path: "/struktura",
            name: "CompanyStructures",
            component: CompanyStructureManagement,
        },
        {
            path: "*",
            redirect: { name: "NotFound" },
        },
        {
            path: "/nerastas",
            name: "NotFound",
            component: NotFound,
        },
    ],
});

export default router;
