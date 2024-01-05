<template>
    <div class="filter-control">
        <label :for="selectName">{{ selectLabel }}</label>
        <select
            @change="changeFilter"
            v-model="selectedFilter"
            :name="selectName"
            :id="selectName"
        >
            <option value="">{{ defaultOption }}</option>
            <option
                v-for="selectOption in selectOptions"
                :key="selectOption.id"
                :value="selectOption.text"
            >
                {{ selectOption.text }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "FilterItemSelect",
    data() {
        return {
            selectedFilter: "",
        };
    },
    props: {
        selectName: {
            type: String,
            required: true,
        },
        selectOptions: {
            type: Array,
            required: true,
        },
        selectLabel: {
            type: String,
            required: true,
        },
        optionDefault: {
            type: String,
            required: false,
            default: "Pasirinkite filtrą..",
        },
    },
    methods: {
        changeFilter() {
            this.$emit("change-filter", this.selectedFilter);
        },
    },
};
</script>
