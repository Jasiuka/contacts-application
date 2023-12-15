<template>
    <div id="app">
        <notifications-list></notifications-list>
        <navigation-bar></navigation-bar>
        <the-modal></the-modal>
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationBar from "./components/UI/NavigationBar.vue";
import NotificationsList from "./components/Notifications/NotificationsList.vue";
import TheModal from "./components/UI/TheModal.vue";
export default {
    components: {
        NavigationBar,
        NotificationsList,
        TheModal,
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
    --white-main: #f8f9fa;
    --grey-main: #e9ecef;
    --blue-main: #74c0fc;
    --blue-light: #d0ebff;
    --blue-dark: #339af0;
    --error-main: #fa5252;
    /* Paddings */
    --pd-smallest: 0.4rem;
    --pd-small: 0.6rem;
    --pd-medium: 1rem;
    --pd-large: 1.2rem;
    --pd-largest: 1.6rem;
    --pd-page: 2.4rem var(--pd-medium);
    /* Gaps */
    --gap-smallest: 0.3rem;
    --gap-small: 0.5rem;
    --gap-medium: 0.8rem;
    --gap-large: 1rem;
    --gap-largest: 1.4rem;
    /* Border radius */
    --border-radius: 5px;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

p {
    margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
    margin: 0;
}

a,
a:link,
a:visited {
    text-decoration: none;
    color: var(--black-main);
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
.nav-link {
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.nav-link:not(.router-link-exact-active):hover {
    border-bottom-color: var(--blue-main);
}

.router-link-exact-active,
.router-link-active {
    border-bottom: 2px solid var(--blue-main);
}

#app {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>
