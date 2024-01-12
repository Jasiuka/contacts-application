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

        checkSelection(selectionArray, name, displayName) {
            if (!selectionArray.length) {
                this.invalidFields.push(name);
                this.CreateNotification({
                    notificationText: `${displayName} laukas nepasirinktas`,
                    type: "error",
                });
                return false;
            } else {
                return true;
            }
        },
        validator(input, inputName, pattern, length = null) {
            let isValid;
            switch (pattern) {
                case "email":
                    isValid = this.checkValueFormatWithRegex(
                        "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
                        input,
                        inputName
                    );
                    break;
                case "phone":
                    isValid = this.checkValueFormatWithRegex(
                        "^[+0-9][0-9]\\d{2,16}",
                        input,
                        inputName
                    );
                    break;
                case "special":
                    isValid = this.checkValueFormatWithRegex(
                        "^[ąčęėįšųūžĄČĘĖĮŠŲŪŽA-Za-z\\s]+(?:\\.[ąčęėįšųūžĄČĘĖĮŠŲŪŽA-Za-z\\s]+)?$",
                        input,
                        inputName
                    );
                    break;
                case "special-w-numbers":
                    isValid = this.checkValueFormatWithRegex(
                        "^[ąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9A-Za-z\\s]+(?:\\.[ąčęėįšųūžĄČĘĖĮŠŲŪŽ0-9A-Za-z\\s]+)?$",
                        input,
                        inputName
                    );
                    break;
                case "street_number":
                    isValid = this.checkValueFormatWithRegex(
                        "^[0-9]{1,3}[A-Z]{0,1}(?:\\-[0-9A-Z]{0,2})?$",
                        input,
                        inputName
                    );
                    break;
                case "street":
                    isValid = this.checkValueFormatWithRegex(
                        "^[ąčęėįšųūžĄČĘĖĮŠŲŪŽA-Za-z\\s]+(?:\\.[ąčęėįšųūžĄČĘĖĮŠŲŪŽA-Za-z\\s]+)?[\\.]{0,1}$",
                        input,
                        inputName
                    );
                    break;
                case "length":
                    isValid = this.checkFieldValueLength(
                        input,
                        length,
                        inputName
                    );
                    break;
            }
            return isValid;
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
        checkMultipleValuesFormatWithRegex(pattern, ...inputs) {
            let isInvalid;
            switch (pattern) {
                case "regular":
                    const regex = new RegExp(
                        "^[ąčęėįšųūžĄČĘĖĮŠŲŪŽa-zA-Z\\s]*$"
                    );
                    for (let i = 0; i < inputs.length; i++) {
                        const inputValid = regex.test(inputs[i].value);
                        if (!inputValid) {
                            this.invalidFields.push(inputs[i].name);
                            isInvalid = true;
                            this.CreateNotification({
                                notificationText:
                                    "Ne visi laukai teisingo formato",
                                type: "error",
                            });
                        }
                    }
                    break;
            }

            return isInvalid;
        },

        checkFieldValueLength(input, maxLength, inputName) {
            const isLengthValid = input.value.length <= maxLength;
            if (!isLengthValid) {
                this.CreateNotification({
                    notificationText: `${inputName} neturi viršyt ${maxLength} simbolių ilgio`,
                    type: "error",
                });
            }
            return isLengthValid;
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
        checkIfAnyChanged(
            inputsNodeList,
            currentObjValues,
            customInputs,
            notificationRequired = false
        ) {
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

            if (allSame && notificationRequired) {
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
    detroyed() {
        this.invalidFields = [];
    },
};
