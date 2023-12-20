<template>
    <div>
        <label :for="selectName">{{ labelText }}</label>
        <select
            :id="selectName"
            :name="selectName"
            :class="{ 'select-invalid': isInvalid && !selectedValue }"
            v-model="selectedValue"
            :required="isRequired"
        >
            <option value="0">{{ notSelectedText }}</option>
            <option
                v-for="option in options"
                :value="option.id"
                :key="option.text"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
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
    },
    data() {
        return {
            selectedValue: 0,
        };
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
}

option:hover,
option:checked {
    background-color: var(--blue-main);
    color: var(--white-main);
}
</style>
