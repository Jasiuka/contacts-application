export const customInputMixin = {
    props: {
        labelText: {
            type: String,
            required: true,
        },
        inputType: {
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
        autoComplete: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            enteredValue: "",
        };
    },
};
