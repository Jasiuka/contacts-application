<template>
    <div v-if="getNotifications.length" class="notification-component">
        <ul class="notifications-list">
            <notification-component
                v-for="{ notificationText, type, id } in getNotifications"
                :notificationText="notificationText"
                :type="type"
                :id="id"
                :key="id"
            ></notification-component>
        </ul>
    </div>
</template>

<script>
import NotificationComponent from "./Notification.vue";
import { mapGetters } from "vuex";
export default {
    components: {
        NotificationComponent,
    },
    computed: {
        ...mapGetters(["getNotifications"]),
    },
};
</script>

<style>
.notification-component {
    position: absolute;
    left: 76dvw;
    top: 10%;
    z-index: 999;
}

.notifications-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-small);
}
</style>
