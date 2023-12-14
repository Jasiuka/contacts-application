<template>
    <nav class="navigation">
        <ul class="navigation-list">
            <navigation-dropdown
                :links="managementDropdown"
                dropdownName="Management"
            ></navigation-dropdown>
            <li>
                <router-link class="nav-link" to="/contacts-management"
                    >Main</router-link
                >
            </li>
            <li v-if="loggedIn">
                <div>Image</div>
            </li>
            <li v-else>
                <router-link class="nav-link" to="/admin-login"
                    >Login</router-link
                >
            </li>
        </ul>
    </nav>
</template>

<script>
import NavigationDropdown from "../NavigationDropdown.vue";
export default {
    data() {
        return {
            managementDropdown: [
                {
                    name: "Contacts management",
                    to: "/contacts-management",
                },
                {
                    name: "Companies management",
                    to: "/companies-management",
                },
                {
                    name: "Structures management",
                    to: "/structures",
                },
                {
                    name: "Accounts management",
                    to: "/admin-accounts",
                },
            ],
            loggedIn: false,
        };
    },
    components: {
        NavigationDropdown,
    },
};
</script>

<style scoped>
.navigation {
    padding: var(--pd-medium);
    display: flex;
    justify-content: end;
    font-size: var(--fs-medium);
    margin-bottom: var(--gap--large);
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}

.navigation-list {
    display: flex;
    gap: var(--gap-medium);
}

.router-link-exact-active {
    border-bottom: 2px solid var(--blue-main);
}
</style>
