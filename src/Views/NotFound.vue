<template>
    <main class="not-found page-inner">
        <h2>Deja, puslapis kurio ieškojote nerastas</h2>
        <router-link class="not-found-link" to="/contacts"
            >Grįžti į pagrindinį</router-link
        >
    </main>
</template>

<style>
.not-found {
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
    background-color: var(--blue-second);
    padding: var(--pd-small);
    border-radius: var(--border-radius);
    transition: all 0.3s ease;
    color: var(--white-main);
}

.not-found-link:hover {
    background-color: var(--blue-main-lighter);
}
</style>
