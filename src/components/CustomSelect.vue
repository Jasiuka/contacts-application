<template>
    <div>
        <label :for="selectName">{{ labelText }}</label>
        <select :id="selectName" :name="selectName">
            <option>{{ notSelectedText }}</option>
            <option
                v-for="option in options"
                :value="option.value"
                :key="option.text"
            >
                {{ option.text }}
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
