import { mapActions } from "vuex";
export const validationMixin = {
    data() {
        return {
            invalidFields: [],
        };
    },

    methods: {
        ...mapActions(["CreateNotification"]),
        checkIfAllFieldsFilled(fieldsArray) {
            fieldsArray.forEach((field) => {
                if (!field.value || field.value === "0") {
                    this.invalidFields.push(field.name);
                }
            });
            console.log(this.invalidFields);
            if (this.invalidFields.length > 0) {
                this.CreateNotification({
                    notificationText:
                        "Ne visi laukai užpildyti! Neužpildyti laukai pažymėti",
                    type: "error",
                });
            }
        },
    },
};
