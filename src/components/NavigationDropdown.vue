<template>
    <div class="dropdown">
        <p class="dropdown-button">
            {{ dropdownName }}
        </p>
        <ul class="dropdown-list">
            <li v-for="{ name, to } in links" :key="name">
                <router-link class="dropdown-link nav-link" :to="to">{{
                    name
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
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
    data() {
        return {
            dropdownVisible: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
    },
};
</script>

<style scoped>
.dropdown {
    position: relative;
    padding-bottom: var(--pd-smallest);
}

.dropdown:hover .dropdown-list {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.dropdown-button {
    font-size: inherit;
    cursor: pointer;
}
.dropdown-list {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: -20%;
    top: 100%;
    background-color: white;
    border-radius: var(--border-radius);
}

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
