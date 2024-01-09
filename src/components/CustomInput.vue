<template>
    <div>
        <label :for="inputName"
            >{{ labelText }}
            <span class="input-required" v-if="isRequired">*</span>
        </label>

        <input
            ref="input"
            :placeholder="placeholder"
            :type="inputType"
            :name="inputName"
            :id="inputName"
            :value="inputValue ? inputValue : enteredValue"
            :class="{
                'input-invalid': isInvalid && !changed,
            }"
            v-model="enteredValue"
            :required="isRequired"
            :maxlength="maxLength"
            :autocomplete="autoComplete"
        />
    </div>
</template>

<script>
import { customInputMixin } from "../utils/mixins/customInputMixin";
export default {
    name: "custom-input",
    mixins: [customInputMixin],
    created() {
        this.enteredValue = this.inputValue;
    },
    mounted() {
        if (this.pattern) {
            this.$refs.input.setAttribute("pattern", this.pattern);
        }
    },
};
</script>

<style scoped>
.inputs {
    display: flex;
}

input {
    background-color: rgba(33, 33, 33, 0.08);
    padding: var(--pd-small);
    border: none;
    font-size: var(--fs-smallest);
    border-radius: var(--border-radius);
}

.input-required {
    color: rgb(247, 37, 37);
    font-weight: 500;
}
.input-invalid {
    border: 2px solid rgb(247, 37, 37);
}

label {
    display: block;
    margin-bottom: var(--gap-small);
}

@media only screen and (max-height: 57rem) {
    input,
    label {
        font-size: calc(var(--fs-smallest) - 0.3rem);
    }
}
</style>
