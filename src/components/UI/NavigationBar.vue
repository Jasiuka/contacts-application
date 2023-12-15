<template>
    <nav class="navigation">
        <ul class="navigation-list">
            <li>
                <router-link to="/kontaktai">
                    <img
                        class="nav-logo"
                        src="../../assets/Teltonika-logotipas 1.png"
                    />
                </router-link>
            </li>
            <li>
                <router-link class="navigation-link" to="/kontaktai"
                    >Kontaktai</router-link
                >
            </li>
            <li>
                <router-link class="navigation-link" to="/imones"
                    >Įmonės</router-link
                >
            </li>
            <li>
                <router-link class="navigation-link" to="/struktura"
                    >Struktūra</router-link
                >
            </li>
            <li>
                <router-link class="navigation-link" to="paskyros"
                    >Paskyros</router-link
                >
            </li>
            <base-dropdown class="navigation-dropdown">
                <template #display>
                    <img src="../../assets/Male-User.png" />
                </template>
                <template #list-items>
                    <li class="navigation-dropdown--item">
                        <button title="Keisti slaptažodį">
                            Keisti slaptažodį
                        </button>
                    </li>
                    <li class="navigation-dropdown--item">
                        <button title="Atsijungti">Atsijungti</button>
                    </li>
                </template>
            </base-dropdown>
        </ul>
    </nav>
</template>

<script>
import BaseDropdown from "../Base/BaseDropdown.vue";
export default {
    components: {
        BaseDropdown,
    },
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
};
</script>

<style scoped>
.navigation {
    padding: var(--pd-medium) var(--pd-largest);
    display: flex;
    font-size: var(--fs-small);
    margin-bottom: var(--gap--large);
    background-color: var(--blue-main);
}

.navigation-list {
    display: flex;
    align-items: center;
    min-width: 100%;
    gap: calc(var(--gap-large) * 2);
}

.navigation-dropdown {
    margin-left: auto;
}

.navigation-dropdown--item button {
    font-size: var(--fs-small);
    padding: var(--pd-small);
}

.navigation-dropdown--item,
.navigation-dropdown--item button {
    width: 100%;
}

.navigation-dropdown--item button:hover {
    background-color: var(--blue-light);
}

.nav-logo {
    height: 3rem;
}
</style>
