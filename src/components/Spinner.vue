<template>
    <div class="spinner" :class="customClass"></div>
</template>

<script>
export default {
    name: "Spinner",
    props: {
        customClass: {
            type: String,
            required: false,
        },
    },
};
</script>

<style scoped>
.spinner {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border: 4px solid var(--blue-main);
    border-radius: 50%;
    border-bottom-color: transparent;
    animation: rotate 0.7s linear infinite;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
