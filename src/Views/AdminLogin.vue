<template>
  <main class="admin-login">
    <spinner v-if="loading"></spinner>
    <button @click="goBack" title="Grįžti atgal" class="admin-back">
      <img src="/src/assets/Icons/Curved-Arrow.png" />
    </button>
    <base-form @submit.native.prevent="submitForm($event)">
      <template #form-heading> Admin prisijungimas </template>
      <template #form-content>
        <span v-if="loginFailed" class="admin-warning">
          El. Paštas arba slaptažodis neteisingas
        </span>
        <custom-input-with-image
          placeholder="Įveskite el. pašto adresą.."
          label-text="Elektroninis paštas"
          input-name="identity"
          input-type="email"
          max-length="40"
          image="dist/assets/Icons/Mail.png"
          :is-invalid="invalidFields.includes('admin_email')"
          :is-required="true"
        ></custom-input-with-image>
        <custom-input-with-image
          placeholder="Įveskite slaptažodį.."
          label-text="Slaptažodis"
          input-name="password"
          input-type="password"
          :auto-complete="true"
          image="dist/assets/Icons/Lock.png"
          :is-required="true"
          :is-invalid="invalidFields.includes('admin_password')"
        ></custom-input-with-image>
      </template>
      <template #form-actions>
        <button :disabled="loading" title="Prisijungti" class="admin-submit">
          Prisijungti
        </button>
      </template>
    </base-form>
  </main>
</template>

<script>
import BaseForm from "../components/Base/BaseForm.vue";
import CustomInputWithImage from "../components/CustomInputWImage.vue";
import { validationMixin } from "../utils/mixins/validationMixin";
import { createFormDataFromInputsArray } from "../utils/helper";
import Spinner from "../components/Spinner.vue";
import { mapActions } from "vuex";
export default {
  name: "AdminLogin",
  components: { BaseForm, CustomInputWithImage, Spinner },
  mixins: [validationMixin],
  data() {
    return {
      loginFailed: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(["Login"]),
    goBack() {
      this.$router.go(-1);
    },
    async submitForm(event) {
      this.loading = true;
      this.invalidFields = [];
      const formContent = event.srcElement.children[1];
      const allFields = formContent.querySelectorAll(
        "input,select,textarea,checkbox"
      );
      // Check if all required fields filled
      const allFieldsFilled = this.checkIfAllFieldsFilled(allFields);
      if (!allFieldsFilled) {
        this.loading = false;
        return;
      }

      // check if email format and length is valid
      const email = formContent.querySelector("[name='identity']");
      const emailIsValid = this.validator(email, "El. Paštas", "email");
      const emailLengthIsValid = this.validator(
        email,
        "El. Paštas",
        "length",
        40
      );
      if (!emailIsValid || !emailLengthIsValid) {
        this.loading = false;
        return;
      }
      const formData = createFormDataFromInputsArray(allFields);
      const loginResponse = await this.Login(formData);
      if (loginResponse.status === 200) {
        this.$router.push({ path: "/" });
      }
      if (loginResponse.status === 503) {
        this.loading = false;

        return;
      } else {
        this.loginFailed = true;
      }
      this.loading = false;
    },
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

.admin-warning {
  color: var(--red-main);
  font-weight: 500;
  align-self: center;
}
</style>
