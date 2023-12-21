import { mapActions } from "vuex";
export const validationMixin = {
    data() {
        return {
            invalidFields: [],
        };
    },

    methods: {
        ...mapActions(["CreateNotification"]),
        checkIfAllFieldsFilled(fieldsArray, ...exceptions) {
            fieldsArray.forEach((field) => {
                const isException = exceptions.some(
                    (exception) => exception === field.name
                );
                if (!isException) {
                    if (!field.value || field.value === "0") {
                        this.invalidFields.push(field.name);
                    }
                }
            });
            if (this.invalidFields.length > 0) {
                this.CreateNotification({
                    notificationText:
                        "Ne visi laukai užpildyti! Neužpildyti laukai pažymėti",
                    type: "error",
                });
                return false;
            } else {
                return true;
            }
        },
        checkValueFormatWithRegex(regEx, input, inputName) {
            const regex = new RegExp(regEx);
            const isValid = regex.test(input.value);
            if (!isValid) {
                this.CreateNotification({
                    notificationText: `Laukas ${inputName} neteisingo formato`,
                    type: "error",
                });
                this.invalidFields.push(input.name);
            }
            return isValid;
        },
        checkMultipleValuesFormatWithRegex(regEx, ...inputs) {
            let isInvalid;
            const regex = new RegExp(regEx);
            inputs.forEach((input) => {
                const isInputInvalid = !regex.test(input.value);
                if (isInputInvalid) {
                    this.invalidFields.push(input.name);
                    isInvalid = true;
                } else {
                    isInvalid = false;
                }
                if (isInputInvalid) {
                    this.CreateNotification({
                        notificationText: "Ne visi laukai teisingo formato",
                        type: "error",
                    });
                }
            });

            return isInvalid;
        },
    },
};
