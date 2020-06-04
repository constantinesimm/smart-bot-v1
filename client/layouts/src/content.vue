<template>
    <main class="app-content" role="main">
        <slot />
    </main>
</template>

<style scoped>
    .app-content {
        height: calc(100vh - 175px);
        padding: 25px 10px;
        background: #eff1ea59;
    }
</style>