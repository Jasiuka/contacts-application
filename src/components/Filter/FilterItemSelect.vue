<template>
    <div class="filter-control">
        <label :for="selectName">{{ selectLabel }}</label>
        <select
            @change="changeFilter"
            v-model="selectedFilter"
            :name="selectName"
            :id="selectName"
        >
            <option value="">{{ optionDefault }}</option>
            <option
                v-for="selectOption in selectOptions"
                :key="selectOption.id"
                :value="selectOption.id"
            >
                {{ selectOption.name }}
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
        valueToSelect: {
            type: String,
            required: false,
        },
    },
    watch: {
        selectOptions() {
            this.selectedFilter = "";
            // this.changeFilter();
        },
    },
    methods: {
        changeFilter() {
            const filterName = this.selectName.replace("filter", "id");

            this.$emit("change-filter", {
                name: filterName,
                value: this.selectedFilter,
            });
        },
    },
    updated() {
        if (this.valueToSelect) {
            this.selectedFilter = this.valueToSelect;
        }
    },
};
</script>

<style scoped>
.filter-control {
    display: flex;
    flex-direction: column;
    gap: var(--gap-smallest);
}

.filter-control label {
    align-self: baseline;
}

.filter-control select {
    width: 25rem;
    border-radius: var(--border-radius);
    padding: var(--pd-smallest) var(--pd-medium);
    background-color: transparent;
    color: #212529a1;
}

.filter-control option {
    color: var(--black-main);
}

.filter-control label,
.filter-control select {
    font-size: var(--fs-smallest);
}
</style>
