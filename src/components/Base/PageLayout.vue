<template>
    <main class="page">
        <h1 class="page-heading">
            <slot name="page-heading" :class="pageHeadingClass"></slot>
        </h1>
        <div class="page-special">
            <slot name="page-special"></slot>
        </div>
        <section class="page-content" :class="pageContentClass">
            <slot name="content"></slot>
        </section>
    </main>
</template>

<script>
export default {
    props: ["pageHeadingClass", "pageContentClass"],
    created() {},
};
</script>

<style>
.page {
    padding: calc(var(--pd-largest) * 2) var(--pd-largest);
}

.page-heading {
    font-size: calc(var(--fs-largest) * 1.5);
    font-weight: 400;
    margin-bottom: var(--gap-largest);
}
</style>
