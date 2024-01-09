<template>
    <nav class="navigation">
        <ul class="navigation-list">
            <li>
                <router-link :to="{ path: '/contacts' }">
                    <img
                        class="nav-logo"
                        src="../../assets/Teltonika-logotipas 1.png"
                    />
                </router-link>
            </li>
            <li>
                <router-link class="navigation-link" :to="{ path: '/contacts' }"
                    >Kontaktai</router-link
                >
            </li>
            <li>
                <router-link class="navigation-link" to="/companies"
                    >Įmonės</router-link
                >
            </li>
            <li>
                <router-link class="navigation-link" to="/structure"
                    >Struktūra</router-link
                >
            </li>
            <li>
                <router-link class="navigation-link" to="/accounts"
                    >Paskyros</router-link
                >
            </li>
            <base-dropdown v-if="getLoggedIn" class="navigation-dropdown">
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
            <li v-else>
                <router-link class="navigation-link" to="/admin-login"
                    >Prisijungti</router-link
                >
            </li>
        </ul>
    </nav>
</template>

<script>
import BaseDropdown from "../Base/BaseDropdown.vue";
import { mapGetters } from "vuex";
export default {
    components: {
        BaseDropdown,
    },
    computed: {
        ...mapGetters(["getLoggedIn"]),
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

.navigation-list > li:last-of-type {
    margin-left: auto;
}
</style>
