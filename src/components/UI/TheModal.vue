<template>
    <div class="modal">
        <div v-if="getModalVisible" class="modal-background"></div>
        <transition name="modal">
            <dialog class="dialog" v-if="getModalVisible" open>
                <component :is="getModalComponent"></component>
                <button
                    v-if="closeRequired"
                    @click="closeModal"
                    class="close-modal"
                    title="Uždaryti"
                >
                    X
                </button>
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
        closeRequired() {
            return !this.getModalComponent.includes("delete");
        },
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
    background-color: rgba(0, 0, 0, 0.137);
    min-width: 100dvw;
    min-height: 100dvh;

    @supports (backdrop-filter: blur()) {
        backdrop-filter: blur(2px);
    }
}

.dialog {
    position: relative;
    border: none;
    box-shadow: 10px 10px 15px -8px rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    padding: calc(var(--pd-largest) * 2);
    display: grid;
    grid-template-columns: 90% 10%;
    column-gap: var(--gap-large);
}

.close-modal {
    /* position: absolute;
    right: 0.5rem;
    top: 0.5rem; */
    font-size: var(--fs-small);
    background-color: var(--blue-main);
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    color: var(--white-main);
}

.close-modal:hover {
    transform: scale(0.95);
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
