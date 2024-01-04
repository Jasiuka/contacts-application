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
        minLength: {
            type: String,
            required: false,
        },
        isRequired: {
            type: Boolean,
            required: false,
        },
        pattern: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            enteredValue: "",
            changed: false,
        };
    },
    watch: {
        enteredValue(newValue, oldValue) {
            if (newValue !== oldValue && this.isInvalid) {
                this.changed = true;
            }
        },
    },
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
