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
                if (selection === "company") this.FetchOffices({ id });
                if (selection === "office") this.FetchDivisions({ id });
                if (selection === "division") this.FetchDepartments({ id });
                if (selection === "department") this.FetchGroups({ id });
            }
        },
        changePhotoDisplayText(event) {
            this.photo = event.target.files[0].name;
        },
    },
    destroyed() {
        this.SET_SELECTED_COMPANY(null);
        this.SET_SELECTED_OFFICE(null);
        this.SET_SELECTED_DIVISION(null);
        this.SET_SELECTED_DEPARTMENT(null);
        this.SET_SELECTED_GROUP(null);
    },
};
