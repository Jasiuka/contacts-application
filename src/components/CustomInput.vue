<template>
    <div>
        <label :for="inputName"
            >{{ labelText }}
            <span class="input-required" v-if="isRequired">*</span>
        </label>

        <input
            :placeholder="placeholder"
            :type="inputType"
            :name="inputName"
            :id="inputName"
            :value="inputValue ? inputValue : enteredValue"
            :class="{
                'input-invalid':
                    isInvalid ||
                    (isInvalid && !enteredValue && isRequired) ||
                    (inputValue !== undefined && isRequired),
            }"
            v-model="enteredValue"
            :required="isRequired"
            :maxlength="maxLength"
        />
    </div>
</template>

<script>
export default {
    name: "custom-input",
    props: {
        labelText: {
            type: String,
            required: true,
        },
        inputType: {
            type: String,
            required: false,
        },
        iconImage: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            required: true,
        },
        inputName: {
            type: String,
            required: true,
        },
        inputValue: {
            type: String,
            required: false,
        },
        isInvalid: {
            type: Boolean,
            required: false,
        },
        maxLength: {
            type: String,
            required: false,
        },
        isRequired: {
            type: Boolean,
            required: false,
        },
    },
    data() {
        return {
            enteredValue: "",
        };
    },
    computed: {
        inputInvalid() {
            return isInvalid;
        },
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
</style>
