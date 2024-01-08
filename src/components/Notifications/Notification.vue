<template>
    <li class="notification-item" :class="type">
        <button
            @click="removeNotification"
            class="notification-close"
            title="Close"
        >
            X
        </button>
        <p>
            {{ notificationText }}
        </p>
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
    z-index: 100;
}

.notification-close {
    font-size: var(--fs-smallest);
    transform: translate(-0.6rem, -0.7rem);
    transition: all 0.3s ease;
    color: var(--white-main);
}

.notification-close.error {
    color: var(--white-main);
}

.notification-close:hover {
    color: var(--black-main);
}
.error {
    background-color: var(--red-main);
    color: var(--white-main);
}

.success {
    background-color: #69db7c;
}
</style>
