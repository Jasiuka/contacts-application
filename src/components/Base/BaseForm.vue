<template>
    <form>
        <div class="form-heading">
            <slot name="form-heading"> </slot>
        </div>
        <div class="form-content">
            <slot name="form-content"> </slot>
        </div>
        <div class="form-actions">
            <slot name="form-actions">
                <button :class="submitClass" type="submit">
                    {{ submitText }}
                </button>
            </slot>
        </div>
    </form>
</template>

<script>
export default {
    name: "BaseForm",
    props: {
        "form-class": {
            type: "String",
            required: false,
        },
        submitText: {
            type: String,
            required: false,
        },
        submitClass: {
            type: String,
            required: false,
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: calc(var(--gap-large) * 2);
    padding-right: var(--pd-largest);
}

.form-content {
    display: flex;
    gap: calc(var(--gap-largest) * 3);
    width: 100%;
}

.form-content:has(.structure),
.form-content:has(.company) {
    flex-direction: column;
}

.form-heading {
    font-size: var(--fs-small);
}

.form-actions {
    align-self: flex-end;
    margin: auto 0;
    display: flex;
    gap: var(--gap-medium);
}

.submit-button {
    background-color: var(--blue-second);
    padding: var(--pd-small) var(--pd-largest);

    color: var(--white-main);
    font-size: var(--fs-small);
    border-radius: var(--border-radius);
}

.submit-button.company .form-content:has(.form-delete--content) {
    flex-direction: column;
    gap: var(--gap-small);
}

.form-delete--content {
    font-size: var(--fs-smallest);
    color: #495057;
}

.form-side {
    display: flex;
    flex-direction: column;
}

.form-side--selections {
    flex: 1;
}

.form-side > div {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap-largest) * 1.5);
}

.form-side:first-of-type > div:first-of-type {
    margin-bottom: calc(var(--gap-largest) * 3);
}

.form-side.form-side--selections .form-control:not(:last-child) {
    margin-bottom: calc(var(--gap-large) * 1.6);
    min-width: 100%;
}

.form-sub-heading {
    margin-bottom: var(--gap-medium);
    font-size: var(--fs-small);
}

.file-upload-wrapper {
    display: flex;
    flex-direction: column-reverse;
    gap: var(--gap-small);
}

.file-upload-wrapper label {
    position: relative;
    background-color: var(--blue-second);
    padding: var(--pd-small);
    text-transform: uppercase;
    color: var(--white-main);
    border-radius: var(--border-radius);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.file-upload-wrapper label:hover,
.submit-button:hover {
    background-color: var(--blue-main-lighter);
}

.file-upload-wrapper label::after {
    content: "No photo uploaded";
    font-weight: 500;
    display: inline-block;
    position: absolute;
    right: -95%;
    top: 50%;
    transform: translateY(-50%);
    color: var(--black-main);
    cursor: default;
}

#file-upload {
    position: absolute;
    z-index: -1;
    user-select: none;
}

#file-upload:valid + label::after {
    display: none;
}

@media only screen and (max-height: 57rem) {
    .form-content {
        gap: var(--gap-largest);
    }

    .form-heading {
        font-size: var(--fs-smallest);
    }

    .form-sub-heading {
        margin-bottom: var(--gap-small);
        font-size: var(--fs-smallest);
    }

    .file-upload__label,
    .image-text {
        font-size: calc(var(--fs-smallest) - 0.5rem);
    }

    .submit-button {
        padding: var(--pd-small) var(--pd-large);
        font-size: var(--fs-smallest);
    }
}
</style>
