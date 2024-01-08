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
import EditContact from "./components/Forms/EditContact.vue";
import DeleteContact from "./components/Forms/DeleteContact.vue";
export default {
    components: {
        NavigationBar,
        NotificationsList,
        TheModal,
        // For modal
        CreateCompany,
        CreateContact,
        EditContact,
        DeleteContact,
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
    --fs-smallest: 1.2rem;
    --fs-small: 1.4rem;
    --fs-medium: 1.8rem;
    --fs-large: 2.2rem;
    --fs-largest: 2.6rem;
    /* Colors */
    --black-main: #212529;
    --white-main: #ffff;
    --grey-main: #f8f9fa;
    --blue-main: #1f3f77;
    --blue-second: #0054a6;
    --blue-main-lighter: #355285;
    --blue-light: #d2d9e4;
    --red-main: #a61a11;
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

p,
h1,
h2,
h3,
h4,
h5,
span,
label {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    text-wrap: balance;
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
.page-inner {
    padding: var(--pd-page);
}

.input-required,
.select-required {
    color: rgb(247, 37, 37);
    font-weight: 500;
}

/* BUTTONS */
.action-btn {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.action-btn:hover,
.page-special-action:hover {
    transform: scale(1.05);
}
.action-delete {
    background-color: var(--red-main);
}

.action-edit {
    background-color: var(--blue-second);
}

.form-delete-button--style {
    color: var(--blue-second);
    text-transform: uppercase;
    font-size: var(--fs-small);
    font-weight: 500;
    border-bottom: 1px solid transparent;
}

.form-delete-button--style:hover {
    color: var(--blue-main-lighter);
    border-bottom-color: var(--blue-second);
}

.page-special-action {
    background-color: var(--blue-second);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--pd-medium);
}

.page-special-action--icon {
    max-width: 1.6rem;
    max-height: 1.6rem;
    object-fit: cover;
}

/* LINKS */

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
}
</style>
