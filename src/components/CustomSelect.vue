<template>
    <div>
        <label :for="selectName"
            >{{ labelText }}
            <span class="select-required" v-if="isRequired">*</span>
        </label>
        <select
            :id="selectName"
            :name="selectName"
            :class="{
                'select-invalid': isInvalid && Number(selectedValue) === 0,
            }"
            v-model="selectedValue"
            :required="isRequired"
            @change="setStructure"
            :disabled="isDisabled"
        >
            <option value="">
                {{ notSelectedText }}
            </option>
            <option
                :selected="selectedValue"
                v-for="option in options"
                :value="option.id"
                :key="option.id"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    emits: ["setStructure"],
    props: {
        options: {
            type: [Array, Object],
            required: false,
        },
        notSelectedText: {
            type: String,
            required: true,
        },
        selectName: {
            type: String,
            required: true,
        },
        labelText: {
            type: String,
            required: true,
        },
        isInvalid: {
            type: Boolean,
            required: false,
        },
        isRequired: {
            type: Boolean,
            required: false,
        },
        valueToSelect: {
            type: [String, Number],
            required: false,
        },
        isDisabled: {
            type: Boolean,
            required: false,
        },
        shouldReset: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            selectedValue: "",
            resets: this.shouldReset,
        };
    },
    watch: {
        options(newVal, oldVal) {
            if (this.resets) {
                this.selectedValue = "";
                this.setStructure();
            }
            if (newVal) {
                this.resets = true;
            }
        },
        valueToSelect(newVal, oldVal) {
            if (newVal && !oldVal) {
                this.selectedValue = newVal;
            }
        },
    },
    methods: {
        setStructure() {
            this.$emit("set-structure", {
                selection: this.selectName.slice(0, -3),
                id: this.selectedValue,
            });
        },
        reset() {
            this.selectedValue = "";
            this.setStructure();
        },
    },
    mounted() {
        this.selectedValue = this.valueToSelect;
    },
    updated() {
        if (this.isDisabled) this.reset();
    },
    destroyed() {
        this.reset();
    },
};
</script>

<style scoped>
select {
    padding: var(--pd-small);
    font-size: var(--fs-smallest);
    background-color: transparent;
    box-shadow: 0px 2px 13px 5px rgba(0, 0, 0, 0.1);
    border: none;
    width: 100%;
    border-radius: var(--border-radius);
}

.select-invalid {
    border: 2px solid rgb(247, 37, 37);
}

label {
    display: block;
    margin-bottom: var(--gap-small);
}

option {
    transition: all 0.3s ease;
    overflow: hidden;
    text-overflow: ellipsis;
}

option:hover,
option:checked {
    background-color: var(--blue-main);
    color: var(--white-main);
}

@media only screen and (max-height: 57rem) {
    select,
    label {
        font-size: calc(var(--fs-smallest) - 0.4rem);
    }

    select {
        padding: var(--pd-smallest);
    }
}

@media only screen and (max-height: 44rem) {
    select,
    label {
        font-size: calc(var(--fs-smallest) - 0.6rem);
    }
}
</style>
