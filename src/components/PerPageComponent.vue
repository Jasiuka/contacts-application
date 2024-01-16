<template>
    <div class="per-page">
        <button @click="toggleDropdown">Rodyti: {{ currentSelection }}</button>

        <ul v-show="isDropdownVisible" class="per-page-dropdown">
            <li
                @click="setPerPageValue(perPageValue)"
                v-for="perPageValue in perPageValues"
                :class="{
                    'per-page-item__active': perPageValue === currentSelection,
                }"
            >
                <p>
                    {{ perPageValue }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PerPageComponent",
    props: {
        perPageValues: {
            type: Array,
            required: true,
        },
        currentSelection: {
            type: [Number, String],
            required: true,
        },
        isDropdownVisible: {
            type: Boolean,
            required: true,
        },
        toggleDropdown: {
            type: Function,
            required: true,
        },
    },
    methods: {
        setPerPageValue(perPageValue) {
            this.$emit("set-per-page", perPageValue);
            this.toggleDropdown();
        },
    },
};
</script>

<style scoped>
.per-page {
    position: relative;
}

.per-page button {
    background-color: var(--blue-second);
    padding: var(--pd-small);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    color: var(--white-main);
    font-weight: 500;
    font-size: var(--fs-smallest);
    width: 8rem;
}
.per-page-dropdown {
    position: absolute;
    background-color: var(--white-main);
    font-size: var(--fs-smallest);
    width: 100%;
    box-shadow: 0px 4px 13px -3px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    overflow: hidden;
    transition: all 0.3s ease;
}

.per-page-dropdown li {
    cursor: pointer;
    width: 100%;
    padding: var(--pd-smallest);
    text-align: center;
    transition: all 0.3s ease;
}

.per-page-dropdown li:hover {
    background-color: var(--blue-second);
    color: var(--white-main);
}

.per-page-dropdown__hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.per-page-item__active {
    background-color: var(--blue-second);
    color: var(--white-main);
}
</style>
