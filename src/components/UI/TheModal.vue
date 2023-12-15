<template>
    <div class="modal">
        <div v-if="getModalVisible" class="modal-background"></div>
        <transition name="modal">
            <dialog class="dialog" v-if="getModalVisible" open>
                <button
                    @click="closeModal"
                    class="close-modal"
                    title="Close modal"
                >
                    X
                </button>
                <component :is="getModalComponent"></component>
            </dialog>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CreateCompany from "../Forms/CreateCompany.vue";
import CreateContact from "../Forms/CreateContact.vue";
export default {
    components: {
        CreateCompany,
        CreateContact,
    },
    name: "TheModal",
    computed: {
        ...mapGetters(["getModalVisible", "getModalComponent"]),
    },
    methods: {
        ...mapMutations(["CLOSE_MODAL"]),
        closeModal() {
            this.CLOSE_MODAL();
        },
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-background {
    position: absolute;
    background-color: #74c1fc1c;
    min-width: 100dvw;
    min-height: 100dvh;

    @supports (backdrop-filter: blur()) {
        backdrop-filter: blur(3px);
    }
}

.dialog {
    position: relative;
}

.close-modal {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    font-size: var(--fs-small);
}

.close-modal:hover {
    color: var(--blue-main);
}

.modal-enter-active {
    animation: scaleIn 0.3s ease-in;
}

.modal-leave-active {
    animation: scaleIn 0.3s ease-out reverse;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.6);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
