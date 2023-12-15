<template>
    <main class="not-found">
        <h2>Unfortunately, page was not found</h2>
        <router-link class="not-found-link" to="/contacts-management"
            >Get back to main</router-link
        >
    </main>
</template>

<style>
.not-found {
    padding: var(--pd-page);
    height: 25rem;
    display: flex;
    flex-direction: column;
    gap: var(--gap-large);
    align-items: center;
    justify-content: center;
}
.not-found h2 {
    font-size: var(--fs-largest);
}

.not-found-link {
    font-size: var(--fs-small);
    background-color: var(--blue-main);
    padding: var(--pd-small);
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
}

.not-found-link:hover {
    background-color: var(--blue-light);
}
</style>
