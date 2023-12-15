<template>
    <div class="dropdown">
        <div class="dropdown-display">
            <slot name="display"></slot>
        </div>
        <ul class="dropdown-list">
            <slot name="list-items"></slot>
        </ul>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    padding-bottom: var(--pd-smallest);
}

.dropdown:hover .dropdown-list {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.dropdown-display {
    font-size: inherit;
    cursor: pointer;
}
.dropdown-list {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: -20%;
    top: 100%;
    background-color: white;
    border-radius: var(--border-radius);
}
</style>
