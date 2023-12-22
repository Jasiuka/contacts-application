<template>
    <li class="notification-item" :class="type">
        <p>
            {{ notificationText }}
        </p>
        <button
            @click="removeNotification"
            class="notification-close"
            title="Close"
        >
            X
        </button>
    </li>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "NotificationComponent",
    props: {
        notificationText: {
            type: String,
            required: true,
        },
        id: {
            type: [String, Number],
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    methods: {
        ...mapMutations(["REMOVE_NOTIFICATION_WITH_CLICK"]),
        removeNotification() {
            this.REMOVE_NOTIFICATION_WITH_CLICK(this.id);
        },
    },
};
</script>

<style scoped>
.notification-item {
    border-radius: var(--border-radius);
    padding: var(--pd-medium);
    display: flex;
    font-size: var(--fs-small);
    gap: var(--gap-small);
    justify-content: space-between;
}

.notification-close {
    font-size: var(--fs-smallest);
    transform: translate(0.6rem, -0.7rem);
    transition: all 0.3s ease;
}

.notification-close:hover {
    color: var(--grey-main);
}
.error {
    background-color: var(--error-main);
}
</style>
