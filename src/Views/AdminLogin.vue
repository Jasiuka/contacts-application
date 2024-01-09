<template>
    <main class="admin-login">
        <button @click="goBack" title="Grįžti atgal" class="admin-back">
            <img src="/src/assets/Icons/Curved-Arrow.png" />
        </button>
        <base-form>
            <template #form-heading> Admin prisijungimas </template>
            <template #form-content>
                <custom-input-with-image
                    placeholder="Įveskite el. pašto adresą.."
                    label-text="Elektroninis paštas"
                    input-name="admin_email"
                    input-type="email"
                    image="/src/assets/Icons/Mail.png"
                    :is-required="true"
                ></custom-input-with-image>
                <custom-input-with-image
                    placeholder="Įveskite slaptažodį.."
                    label-text="Slaptažodis"
                    input-name="admin_password"
                    input-type="password"
                    :auto-complete="true"
                    image="/src/assets/Icons/Lock.png"
                    :is-required="true"
                ></custom-input-with-image>
            </template>
            <template #form-actions>
                <button title="Prisijungti" class="admin-submit">
                    Prisijungti
                </button>
            </template>
        </base-form>
    </main>
</template>

<script>
import BaseForm from "../components/Base/BaseForm.vue";
import CustomInputWithImage from "../components/CustomInputWImage.vue";
export default {
    name: "AdminLogin",
    components: { BaseForm, CustomInputWithImage },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        submitForm() {},
    },
};
</script>

<style>
.admin-login {
    background-color: var(--blue-main);
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.admin-login form {
    background-color: var(--white-main);
    padding: calc(var(--pd-largest) * 3);
    box-shadow: 6px 6px 7px 0px rgba(0, 0, 0, 0.1);
}

.admin-login form .form-heading {
    font-size: var(--fs-medium);
    margin-bottom: calc(var(--gap-largest) * 2);
    align-self: center;
}

.admin-login form .form-content {
    display: flex;
    margin-bottom: calc(var(--gap-largest) * 1.5);
    flex-direction: column;
    gap: calc(var(--gap-largest) * 1.5);
}

.admin-login form .form-content input {
    font-size: var(--fs-small);
}

.admin-login form .form-content label {
    font-size: var(--fs-small);
}

.admin-login form .form-actions {
    align-self: center;
}

.admin-submit {
    background-color: var(--blue-second);
    padding: var(--pd-small) var(--pd-large);
    font-size: var(--fs-small);
    color: var(--white-main);
    text-transform: uppercase;
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
}

.admin-submit:hover {
    transform: scale(1.03);
}

.admin-back {
    position: absolute;
    background-color: var(--white-main);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    top: 10%;
    left: 5%;
    box-shadow: 6px 6px 7px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.admin-back:hover {
    transform: scale(0.97);
}
</style>
