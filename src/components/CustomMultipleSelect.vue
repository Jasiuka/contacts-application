<template>
    <div class="custom-multiple-select">
        <span class="label"
            >{{ labelText }}<span class="input-required">*</span></span
        >
        <div
            class="select-options"
            :class="{
                overflow: shouldOverflow,
                'is-invalid': isInvalid && !changed,
            }"
        >
            <span class="selection-option">{{ selectionDefault }}</span>
            <span
                @click="modifyOptions(option)"
                :key="option.id"
                v-for="option in options"
                class="selection-option"
                :class="{
                    'selection--selected': selected.includes(option.id),
                }"
                >{{ option.name }}</span
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        gotSelected: {
            type: Array,
            required: false,
        },
        selectionDefault: {
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
            default: false,
        },
    },
    data() {
        return {
            selected: [],
            changed: false,
        };
    },
    watch: {
        selected() {
            if (this.isInvalid) {
                this.changed = true;
            }
        },
    },
    computed: {
        shouldOverflow() {
            return this.options.length > 4;
        },
    },
    methods: {
        modifyOptions(selection) {
            const selectionExistIndex = this.selected.indexOf(selection.id);
            if (selectionExistIndex !== -1) {
                this.selected.splice(selectionExistIndex, 1);
            } else {
                this.selected.push(selection.id);
            }
            this.$emit("selection-change", this.selected);
        },
    },
};
</script>

<style>
.custom-multiple-select {
    display: flex;
    flex-direction: column;
}

.select-options {
    max-height: 10rem;
}

.label {
    margin-bottom: var(--gap-smallest);
}

.overflow {
    overflow-y: scroll;
}

.selection-option {
    display: block;
    font-size: var(--fs-smallest);
    width: 100%;
    padding: var(--pd-smallest) var(--pd-medium);
    cursor: pointer;
    transition: all 0.2s ease;
    text-overflow: ellipsis;
    overflow: hidden;
}

.selection--selected {
    background-color: var(--blue-second);
    color: var(--white-main);
}

.is-invalid {
    border: 2px solid rgb(247, 37, 37);
}
</style>
