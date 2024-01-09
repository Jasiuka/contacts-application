<template>
    <div class="input-with-image__wrapper">
        <label :for="inputName">{{ labelText }}</label>
        <label
            :for="inputName"
            class="input-with-image"
            :class="{
                'input-invalid': isInvalid && !changed,
            }"
        >
            <img :src="image" />
            <input
                :name="inputName"
                :id="inputName"
                :type="inputType"
                v-model.trim="enteredValue"
                :minlength="minLength"
                :maxlength="maxLength"
                :required="isRequired"
                :placeholder="placeholder"
                :autocomplete="autoComplete"
            />
        </label>
    </div>
</template>

<script>
import { customInputMixin } from "../utils/mixins/customInputMixin";
export default {
    name: "CustomInputWithImage",
    mixins: [customInputMixin],
    props: {
        image: {
            type: String,
            required: true,
        },
    },
};
</script>

<style>
.input-with-image__wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap-smallest);
}
.input-with-image {
    background-color: rgba(33, 33, 33, 0.08);
    padding: var(--pd-smallest) var(--pd-medium);
    display: flex;
    align-items: center;
    gap: var(--gap-small);
    border: 2px solid transparent;
    border-radius: var(--border-radius);
}

.input-with-image:has(input:focus) {
    border: 2px solid var(--blue-second);
}

.input-with-image input {
    background-color: transparent;
    outline: none;
    border: none;
}

.input-invalid {
    border: 2px solid var(--red-main);
}
</style>
