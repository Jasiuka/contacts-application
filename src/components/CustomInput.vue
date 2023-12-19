<template>
    <div>
        <label :for="inputName">{{ labelText }}</label>

        <input
            :placeholder="placeholder"
            :type="inputType"
            :name="inputName"
            :id="inputName"
            :value="inputValue"
        />
    </div>
</template>

<script>
export default {
    name: "custom-input",
    props: {
        labelText: {
            type: String,
            required: true,
        },
        inputType: {
            type: String,
            required: false,
        },
        iconImage: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            required: true,
        },
        inputName: {
            type: String,
            required: true,
        },
        inputValue: {
            type: String,
            required: false,
        },
    },
};
</script>

<style scoped>
.inputs {
    display: flex;
}

input {
    background-color: rgba(33, 33, 33, 0.08);
    padding: var(--pd-small);
    border: none;
    font-size: var(--fs-smallest);
    border-radius: var(--border-radius);
}

label {
    display: block;
    margin-bottom: var(--gap-small);
}
</style>
