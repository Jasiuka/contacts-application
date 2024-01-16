<template>
    <div class="search">
        <label class="search-wrapper" :class="customClass">
            <img src="/src/assets/Icons/Search.png" />
            <input
                v-model.trim="searchQuery"
                :placeholder="placeholder"
                type="search"
            />
        </label>
    </div>
</template>

<script>
import { debounce } from "../utils/helper";
export default {
    name: "SearchComponent",
    data() {
        return {
            searchQuery: "",
        };
    },
    props: {
        placeholder: {
            type: String,
            required: false,
            default: "",
        },
        customClass: {
            type: String,
            required: false,
        },
    },
    watch: {
        searchQuery() {
            this.sendQuery();
        },
    },
    methods: {
        sendQuery() {
            this.$emit("send-query", this.searchQuery);
        },
    },
    created() {
        this.sendQuery = debounce(this.sendQuery, 1000);
    },
};
</script>

<style scoped>
.search-wrapper {
    display: flex;
    align-items: center;
    gap: var(--gap-medium);
    background-color: #d9dadb;
    padding: var(--pd-small);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    font-size: var(--fs-smallest);
}

.search-wrapper input {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: var(--fs-smallest);
    width: 20rem;
}
</style>
