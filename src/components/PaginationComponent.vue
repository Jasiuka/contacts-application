<template>
    <div class="pagination">
        <button>Praeitas puslapis</button>
        <p>{{ currentPage }}/{{ totalPages }}</p>
        <button>Sekantis puslapis</button>
    </div>
</template>

<script>
import { compileScript } from "vue/compiler-sfc";

export default {
    name: "PaginationComponent",
    props: {
        currentPage: {
            type: String,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
    },
    methods: {
        changePage(page) {
            console.log("Page to");
            console.log(page);
            this.$emit("change-page", page);
        },
    },
};
</script>

<style></style>
