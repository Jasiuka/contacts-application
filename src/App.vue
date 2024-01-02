<template>
    <div id="app">
        <notifications-list></notifications-list>
        <navigation-bar></navigation-bar>
        <the-modal>
            <template #modal-component>
                <component :is="getModalComponent"></component>
            </template>
        </the-modal>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavigationBar from "./components/UI/NavigationBar.vue";
import NotificationsList from "./components/Notifications/NotificationsList.vue";
import TheModal from "./components/UI/TheModal.vue";
import CreateCompany from "./components/Forms/CreateCompany.vue";
import CreateContact from "./components/Forms/CreateContact.vue";
export default {
    components: {
        NavigationBar,
        NotificationsList,
        TheModal,
        // For modal
        CreateCompany,
        CreateContact,
    },
    computed: {
        ...mapGetters(["getModalComponent"]),
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap");
:root {
    /* Font sizes */
    --fs-smallest: clamp(0.8rem. 5vw, 1.2rem);
    --fs-small: clamp(1.2rem, 5vw, 1.4rem);
    --fs-medium: clamp(1.4rem, 5vw, 1.8rem);
    --fs-large: clamp(1.8rem, 5vw, 2.2rem);
    --fs-largest: clamp(2.2rem, 5vw, 2.6rem);
    /* Colors */
    --black-main: #212529;
    --white-main: #ffff;
    --grey-main: #f8f9fa;
    --blue-main: #1f3f77;
    --blue-light: #d2d9e4;
    /* Paddings */
    --pd-smallest: 0.4rem;
    --pd-small: 0.6rem;
    --pd-medium: 1rem;
    --pd-large: 1.2rem;
    --pd-largest: 1.6rem;
    /* Gaps */
    --gap-smallest: 0.3rem;
    --gap-small: 0.5rem;
    --gap-medium: 0.8rem;
    --gap-large: 1rem;
    --gap-largest: 1.4rem;
    /* Border radius */
    --border-radius: 8px;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

p {
    margin: 0;
}

a,
a:link,
a:visited {
    text-decoration: none;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    color: var(--black-main);
    transition: all 0.3s ease;
}

*,
*::after,
*::before {
    box-sizing: border-box;
}

body {
    color: var(--black-main);
    background-color: var(--grey-main);
    margin: 0;
}

/* Common */
.navigation-link {
    color: var(--white-main);
    font-weight: 500;
    transition: all 0.3s ease;
}

.navigation-link:not(.router-link-exact-active):hover {
    color: var(--blue-light);
}

.router-link-exact-active,
.router-link-active {
    color: var(--blue-light);
}

#app {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>
