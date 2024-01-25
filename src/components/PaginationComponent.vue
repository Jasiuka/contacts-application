<template>
    <div class="pagination" :class="customClass">
        <div class="pagination-wrapper">
            <button
                class="pagination-button"
                :disabled="currentPage <= 1"
                @click="changePage(currentPage - 1)"
            >
                Praeitas puslapis
            </button>
            <p class="pagination-numbers">
                {{ currentPage }}/{{ totalPages ? totalPages : 1 }}
            </p>
            <button
                class="pagination-button"
                :disabled="currentPage >= totalPages"
                @click="changePage(currentPage + 1)"
            >
                Sekantis puslapis
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationComponent",
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        customClass: {
            type: String,
            required: false,
        },
    },
    methods: {
        changePage(page) {
            this.$emit("change-page", page);
        },
    },
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
}

.pagination-wrapper {
    display: flex;
    align-items: center;
    gap: var(--gap-small);
}

.pagination-button {
    background-color: var(--blue-second);
    color: var(--white-main);
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
}

.pagination-button:hover {
    background-color: var(--blue-main-lighter);
}

.pagination-button:disabled {
    background-color: var(--blue-light);
    cursor: default;
}

.pagination-numbers {
    letter-spacing: 3px;
    font-weight: 500;
}
</style>
