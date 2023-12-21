<template>
    <div class="modal">
        <div v-if="getModalVisible" class="modal-background"></div>
        <transition name="modal">
            <dialog class="dialog" v-if="getModalVisible" open>
                <button
                    v-if="!closeNotRequired"
                    @click="closeModal"
                    class="close-modal"
                    title="Uždaryti"
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
import DeleteContact from "../Forms/DeleteContact.vue";
import EditContact from "../Forms/EditContact.vue";
export default {
    components: {
        CreateCompany,
        CreateContact,
        DeleteContact,
        EditContact,
    },
    name: "TheModal",
    computed: {
        ...mapGetters(["getModalVisible", "getModalComponent"]),
        closeNotRequired() {
            return this.getModalComponent.includes("delete");
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
    z-index: 50;
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
    padding: calc(var(--pd-largest) * 1.5) var(--pd-largest);
    padding-left: calc(var(--pd-largest) * 2);
    display: flex;
    flex-direction: column;
    gap: var(--gap-largest);
    min-width: 40dvw;
}

.close-modal {
    align-self: flex-end;
    font-size: var(--fs-small);
    background-color: var(--blue-second);
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
