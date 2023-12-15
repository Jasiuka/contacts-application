<template>
    <base-dropdown>
        <template #display>
            {{ dropdownName }}
        </template>
        <template #list-items>
            <li v-for="{ name, to } in links" :key="name">
                <router-link class="dropdown-link nav-link" :to="to">{{
                    name
                }}</router-link>
            </li>
        </template>
    </base-dropdown>
</template>

<script>
import BaseDropdown from "./Base/BaseDropdown.vue";
export default {
    components: {
        BaseDropdown,
    },
    props: {
        dropdownName: {
            type: String,
            required: true,
        },
        links: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.dropdown-list li {
    font-size: var(--fs-small);
    min-width: 100%;
}

.dropdown-link {
    padding: var(--pd-small);
    display: inline-block;
    min-width: 100%;
}
</style>
