<template>
    <div class="custom-checkbox-select">
        <div class="select" v-for="option in options" :key="option.name">
            <input
                type="checkbox"
                :id="option.name"
                :name="option.name"
                @change="check($event, option.name)"
            />
            <label :for="option.name">{{ option.label }}</label>
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomCheckboxSelect",
    props: {
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            checks: {},
        };
    },
    methods: {
        check(event, checkName) {
            const value = event.target.checked;
            this.checks[checkName] = value;
            console.log(this.checks);
            // this.sendChecks();
        },
        sendChecks() {
            this.$emit("send-checks", this.checks);
        },
    },
};
</script>

<style scoped>
.custom-checkbox-select {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: var(--gap-smallest);
}
.select {
    display: flex;
    align-items: center;
    gap: var(--gap-small);
    font-size: var(--fs-smallest);
}

.select input {
    height: 1.5rem;
    width: 1.5rem;
}
</style>
