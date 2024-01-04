import { mapMutations, mapActions, mapGetters } from "vuex";
export const contactFormMixin = {
    data() {
        return {
            photo: "",
            company: "",
            office: "",
            division: "",
            department: "",
            group: "",
        };
    },
    computed: {
        ...mapGetters([
            "getStructures",
            "getSelectedCompany",
            "getSelectedOffice",
            "getSelectedDivision",
            "getSelectedDepartment",
            "getSelectedGroup",
            "getCompanies",
            "getOffices",
            "getDivisions",
            "getDepartments",
            "getGroups",
        ]),
    },
    methods: {
        ...mapMutations([
            "CLOSE_MODAL",
            "SET_SELECTED_COMPANY",
            "SET_SELECTED_OFFICE",
            "SET_SELECTED_DIVISION",
            "SET_SELECTED_DEPARTMENT",
            "SET_SELECTED_GROUP",
        ]),
        ...mapActions([
            "FetchCompanies",
            "FetchOffices",
            "FetchDivisions",
            "FetchDepartments",
            "FetchGroups",
        ]),
        setter({ selection, id }) {
            const setterFunction = {
                set_company: () => this.SET_SELECTED_COMPANY(id),
                set_office: () => this.SET_SELECTED_OFFICE(id),
                set_division: () => this.SET_SELECTED_DIVISION(id),
                set_department: () => this.SET_SELECTED_DEPARTMENT(id),
                set_group: () => this.SET_SELECTED_GROUP(id),
            };
            setterFunction[`set_${selection}`]();
            this[selection] = id;
            if (id.trim() && selection.trim()) {
                if (selection === "company") {
                    this.FetchOffices({ id });
                    this.SET_SELECTED_OFFICE("");
                    this.SET_SELECTED_DIVISION("");
                    this.SET_SELECTED_DEPARTMENT("");
                    this.SET_SELECTED_GROUP("");
                }
                if (selection === "office") {
                    this.FetchDivisions({ id });
                    this.SET_SELECTED_DIVISION("");
                    this.SET_SELECTED_DEPARTMENT("");
                    this.SET_SELECTED_GROUP("");
                }
                if (selection === "division") {
                    this.FetchDepartments({ id });
                    this.SET_SELECTED_DEPARTMENT("");
                    this.SET_SELECTED_GROUP("");
                }
                if (selection === "department") {
                    this.FetchGroups({ id });
                    this.SET_SELECTED_GROUP("");
                }
            }
        },
        changePhotoDisplayText(event) {
            this.photo = event.target.files[0].name;
        },
    },
    destroyed() {
        this.SET_SELECTED_COMPANY("");
        this.SET_SELECTED_OFFICE("");
        this.SET_SELECTED_DIVISION("");
        this.SET_SELECTED_DEPARTMENT("");
        this.SET_SELECTED_GROUP("");
    },
};
