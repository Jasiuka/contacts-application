import { mapActions } from "vuex";
import { createObjectWithOldAndNewValues } from "../helper";
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
                    if (!field.value.trim() || field.value === "0") {
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

            for (let i = 0; i < inputs.length; i++) {
                const inputValid = regex.test(inputs[i].value);
                if (!inputValid) {
                    this.invalidFields.push(inputs[i].name);
                    isInvalid = true;
                    this.CreateNotification({
                        notificationText: "Ne visi laukai teisingo formato",
                        type: "error",
                    });
                }
            }
            return isInvalid;
        },

        checkFileFormat(inputName, fileFormat, ...availableFormats) {
            const isFormatValid = availableFormats.includes(fileFormat);
            if (!isFormatValid) {
                this.CreateNotification({
                    notificationText: `${inputName} netinkamo formato. Galimi formatai ${availableFormats.toString()}`,
                    type: "error",
                });
            }
            return isFormatValid;
        },
        checkIfAnyChanged(inputsNodeList, currentObjValues, customInputs) {
            const oldAndNewValuesObject = createObjectWithOldAndNewValues(
                inputsNodeList,
                currentObjValues,
                customInputs
            );
            let allSame = true;

            Object.values(oldAndNewValuesObject).every((value) => {
                if (value.newVal !== value.oldVal) {
                    allSame = false;
                    return false;
                }
                if (value.newVal === value.oldVal) {
                    return true;
                }
            });

            if (allSame) {
                this.CreateNotification({
                    notificationText:
                        "Bent vienas laukas turėtų būti pakeistas!",
                    type: "error",
                });
            }
            return allSame;
        },
        checkIfSingleChanged(
            inputValue,
            currentValue,
            notificationRequired = false
        ) {
            const notChanged = inputValue === currentValue;
            if (notChanged && notificationRequired) {
                this.CreateNotification({
                    notificationText:
                        "Bent vienas laukas turėtų būti pakeistas!",
                    type: "error",
                });
            }
            return notChanged;
        },
    },
};
