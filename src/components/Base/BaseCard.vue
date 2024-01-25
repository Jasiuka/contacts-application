<template>
    <div class="card">
        <div class="card-header" :class="cardHeaderClass">
            <slot name="card-header"></slot>
        </div>
        <div class="card-content" :class="cardContentClass">
            <slot name="card-content"></slot>
        </div>
        <div class="card-actions" :class="cardActionsClass">
            <slot name="card-actions"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ["cardContentClass", "cardHeaderClass", "cardActionsClass"],
};
</script>

<style>
.card {
    box-shadow: 0px 4px 13px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: var(--gap-large);
    align-items: baseline;
    padding: var(--pd-largest);
    /* background-color: linen; */
}

.card-actions {
    display: flex;
    align-items: center;
    gap: var(--gap-medium);
}
</style>
